import { TaskModel } from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await TaskModel.findAll();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await TaskModel.findById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = await TaskModel.create(title);
  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }
  if (req.body.title !== undefined && req.body.title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  const updatedTask = await TaskModel.update(parseInt(req.params.id), req.body);
  if (!updatedTask) return res.status(404).json({ error: "Task not found" });

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const success = await TaskModel.delete(parseInt(req.params.id));
  if (!success) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
};
