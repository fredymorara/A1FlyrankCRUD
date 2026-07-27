import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Establish a reliable path to the database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../tasks.db");

// Connect to SQLite
const db = new Database(dbPath);

// Initialize Database Schema (Migration)
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);

// Seed Database if empty
const countQuery = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();
if (countQuery.count === 0) {
  const insertTask = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  
  // Use a transaction for bulk inserts (best practice for performance)
  const seed = db.transaction(() => {
    insertTask.run("Learn Express architecture", 1);
    insertTask.run("Implement MVC pattern", 1);
    insertTask.run("Connect to SQLite professionally", 0);
  });
  
  seed();
  console.log("Database seeded with initial tasks.");
}

export default db;
