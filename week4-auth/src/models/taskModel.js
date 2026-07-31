import pool from "../config/db.js";

export const TaskModel = {
  findAll: async () => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    return result.rows; // Postgres puts the data inside a 'rows' array
  },

  findById: async (id) => {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0]; // Return the first matched row
  },

  create: async (title) => {
    // RETURNING * is a cool Postgres feature that immediately returns the newly inserted row!
    const result = await pool.query(
      "INSERT INTO tasks (title, done) VALUES ($1, 0) RETURNING *",
      [title],
    );
    return result.rows[0];
  },

  update: async (id, updates) => {
    const task = await TaskModel.findById(id);
    if (!task) return null;

    const newTitle = updates.title !== undefined ? updates.title : task.title;
    const newDone =
      updates.done !== undefined ? (updates.done ? 1 : 0) : task.done;

    const result = await pool.query(
      "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *",
      [newTitle, newDone, id],
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    return result.rowCount > 0; // rowCount tells us how many rows were deleted
  },
};
