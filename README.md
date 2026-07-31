# FlyRank CRUD API: A Backend Learning Journey

Welcome to the FlyRank CRUD API! This repository represents my journey from building a simple in-memory REST API to deploying a production-ready PostgreSQL architecture using Docker.

## 📂 Repository Structure

### 1. [Week 2: Build Your First CRUD API](./week2-in-memory/)
This is where it all started. I built a simple REST API using Node.js and Express.
* **Features:** Full CRUD endpoints (GET, POST, PUT, DELETE).
* **Storage:** Data was stored in a simple JavaScript array.
* **Limitations:** Every time the server restarted, all data was lost.

### 2. [Week 3 (Task 1): Connecting CRUD to SQLite](./week3-a1-sqlite/)
To fix the data loss issue, I upgraded the API to use a real database.
* **Database:** SQLite (`better-sqlite3`).
* **Storage:** Data was permanently saved to a local `tasks.db` file.
* **Logic:** Wrote raw SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) to handle all CRUD operations.

### 3. [Week 3 (Task 2): Postgres in Docker](./week3-a2-postgres-docker/)
This is the ultimate survival kit applied in one real task.
* **Architecture:** Implemented the **MVC (Model-View-Controller)** pattern. Swapped the in-memory/SQLite store for a real repository without changing the service or routes.
* **Database:** **PostgreSQL** database using the `pg` library.
* **Containerization:** Both the Node.js application and the PostgreSQL database run inside **Docker** containers, orchestrated with `docker-compose.yml`.
* **Persistence:** Data survives container destruction thanks to a Docker Volume (`pgdata`).
* **Security:** Connection strings are hidden inside a `.env` file (with a `.env.example` committed).

---

## 🚀 How to Run the Latest Version (Week 3 - Task 2)

If you want to run the latest version of this project:

1. Navigate to the latest directory:
   ```bash
   cd week3-a2-postgres-docker
   ```
2. Start the entire stack (App + Database) with one command:
   ```bash
   docker compose up -d --build
   ```
3. Visit `http://localhost:3000/docs` to view the Swagger UI and interact with the API!
