import express from "express";
import Database from "better-sqlite3";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { get } from "https";

const app = express();
const swaggerDocument = JSON.parse(fs.readFileSync("./openapi.json", "utf8"));

app.use(express.json());

//1. connect to the database
const db = new Database("tasks.db");

//2. create table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done INTEGER DEFAULT 0
  )`);

//3. check how many rows currently in tasks table
const countQuery = db.prepare("SELECT COUNT(*) AS count FROM tasks");
const result = countQuery.get();

//if count is 0, insert our 3 starter rows
if (result.count === 0) {
  const insertTask = db.prepare("INSERT INTO tasks (title, done) VALUES(?,?)");
  insertTask.run("Learn Express", 1);
  insertTask.run("Build CRUD API", 0);
  insertTask.run("Connect to SQLite", 0);

  console.log("Inserted 3 example tasks!");
}

const port = 3000;

//Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({
    name: "Todo List API",
    version: "1.0.0",
    endpoint: "/tasks",
  });
});

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  const query = db.prepare("SELECT * FROM tasks");
  const allTasks = query.all();
  res.json(allTasks);
});

// Get a specific task
app.get("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const query = db.prepare("SELECT * FROM tasks WHERE id = ?");

  const task = query.get(requestedId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Create a new task
app.post("/tasks", (req, res) => {
  const title = req.body.title;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const insertQuery = db.prepare(
    "INSERT INTO tasks (title, done) VALUES (?, ?)",
  );

  const info = insertQuery.run(title, 0);
  const newTask = {
    id: info.lastInsertRowid,
  };

  res.status(201).json(newTask);
});

// Update tasks
app.put("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);

  const getQuery = db.prepare("SELECT * FROM tasks WHERE id  = ?");
  const task = getQuery.get(requestedId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }
  if (req.body.title !== undefined && req.body.title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  const newTitle = req.body.title !== undefined ? req.body.title : task.title;
  let newDone = task.done;

  if (req.body.done !== undefined) {
    newDone = req.body.done ? 1 : 0;
  }

  const updateQuery = db.prepare(
    "UPDATE tasks SET title = ?, done = ? WHERE id = ?",
  );
  updateQuery.run(newTitle, newDone, requestedId);

  res.json({
    id: requestedId,
    title: newTitle,
    done: newDone,
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const deleteQuery = db.prepare("DELETE FROM tasks WHERE id = ?");
  const info = deleteQuery.run(requestedId);

  if (info.changes === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
