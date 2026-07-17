import express from "express";

const app = express();
let tasks = [
  { id: 1, title: "Learn Express", done: true },
  { id: 2, title: "Build CRUD API", done: false },
  { id: 3, title: "Publish to Github", done: false },
];

const port = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Todo List API",
    version: "1.0.0",
    endpoint: "/tasks",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const requestedId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === requestedId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
