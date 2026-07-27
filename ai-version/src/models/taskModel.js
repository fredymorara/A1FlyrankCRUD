import db from "../config/db.js";

export const TaskModel = {
  findAll: () => {
    return db.prepare("SELECT * FROM tasks").all();
  },
  
  findById: (id) => {
    return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  },
  
  create: (title) => {
    const info = db.prepare("INSERT INTO tasks (title, done) VALUES (?, 0)").run(title);
    return {
      id: info.lastInsertRowid,
      title: title,
      done: 0
    };
  },
  
  update: (id, updates) => {
    // First verify it exists
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!task) return null;

    // Use existing values as defaults if not provided in updates
    const newTitle = updates.title !== undefined ? updates.title : task.title;
    let newDone = task.done;
    if (updates.done !== undefined) {
        newDone = updates.done ? 1 : 0;
    }

    db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(newTitle, newDone, id);
    
    return {
      id: id,
      title: newTitle,
      done: newDone
    };
  },
  
  delete: (id) => {
    const info = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
    return info.changes > 0; // Returns true if a row was deleted, false otherwise
  }
};
