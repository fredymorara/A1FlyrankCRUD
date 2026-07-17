// Simulated Database Model
let tasks = [
  { id: 1, title: "Learn Express architecture", done: true },
  { id: 2, title: "Implement MVC pattern", done: false },
  { id: 3, title: "Add authentication middleware", done: false },
];

export const TaskModel = {
  findAll: () => tasks,
  
  findById: (id) => tasks.find((t) => t.id === id),
  
  create: (title) => {
    let nextId = 1;
    if (tasks.length > 0) {
      nextId = Math.max(...tasks.map((task) => task.id)) + 1;
    }
    const newTask = { id: nextId, title, done: false };
    tasks.push(newTask);
    return newTask;
  },
  
  update: (id, updates) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;

    if (updates.title !== undefined) task.title = updates.title;
    if (updates.done !== undefined) task.done = updates.done;
    return task;
  },
  
  delete: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
};
