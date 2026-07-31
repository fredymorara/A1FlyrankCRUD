import express from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", requireAuth, createTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;
