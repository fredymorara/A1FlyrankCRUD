import express from "express";

const app = express();
app.use(express.json());

// Task Store
let tasks = [
  { id: 1, title: "Learn Express", done: true },
  { id: 2, title: "Build CRUD API", done: false },
  { id: 3, title: "Publish to Github", done: false },
];

const port = 3000;

// API Endpoints
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
  res.json(tasks);
});

// Get a specific task
app.get("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === requestedId);

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
  let nextId = 1;
  if (tasks.length > 0) {
    const highestId = Math.max(...tasks.map((task) => task.id));
    nextId = highestId + 1;
  }

  const newTask = {
    id: nextId,
    title: title,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update tasks
app.put("/tasks/:id", (req, res) => {
  const requestedId = pasrseInt(req.params.id);
  const task = tasks.find((t) => t.id === requestedId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }

  if (req.body.title !== undefined) {
    task.done = req.body.done;
  }

  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === requestedId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
