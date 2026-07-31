# Week 3: SQLite Data Persistence

This folder contains the evolution of the CRUD API. The in-memory array has been replaced with a real, local SQLite database, meaning data finally survives server restarts!

## 🎯 Goal
Take the CRUD API from Week 2 and replace the in-memory task list with a SQLite database, without changing how the API endpoints behave.

## 🚀 Features
* **SQLite Database:** Uses the `better-sqlite3` library to store data in a local `tasks.db` file.
* **Auto-Initialization:** The database and tables are automatically created if they don't exist when the server starts.
* **Auto-Seeding:** Inserts three example tasks only on the very first run.
* **Raw SQL Queries:** All CRUD operations use actual SQL (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
* **Unchanged API:** The URLs, request bodies, and JSON responses remain exactly the same as Week 2.

## 💻 How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. The `tasks.db` file will appear in the directory. You can view the data manually using **DB Browser for SQLite**.

## 🔍 Example SQL Query
Behind the scenes, when you request a single task, the server runs this query:
```sql
SELECT * FROM tasks WHERE id = ?;
```
