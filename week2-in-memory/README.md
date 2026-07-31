# Week 2: Build Your First CRUD API

This folder contains the foundation of the FlyRank CRUD API. It is a fully functional REST API built with Node.js and Express, storing data in-memory.

## 🎯 Goal
Build a small API that manages a to-do list: create tasks, read them, update them, and delete them (CRUD). View and test the API using Swagger UI.

## 🚀 Features
* **In-Memory Storage:** Data is stored in a JavaScript array. (Note: Data is lost when the server restarts).
* **Validation & Errors:**
  * Returns `404 Not Found` for unknown task IDs.
  * Returns `400 Bad Request` if creating/updating a task with invalid or missing data.
* **RESTful Endpoints:**
  * `GET /` - API Information
  * `GET /health` - Health check (`{ "status": "ok" }`)
  * `GET /tasks` - List all tasks
  * `GET /tasks/:id` - List a single task
  * `POST /tasks` - Create a task
  * `PUT /tasks/:id` - Update a task
  * `DELETE /tasks/:id` - Delete a task

## 💻 How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. Open `http://localhost:3000/docs` in your browser to view the interactive **Swagger UI** and test the endpoints!

## 🧪 Example Request (cURL)
```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```
