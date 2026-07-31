# Week 3 (Task 2): Postgres in Docker

This folder contains the second assignment of Week 3. It uses the MVC architecture and runs both the Node.js application and a PostgreSQL database inside Docker containers.

## 🎯 Goal
Run Postgres in Docker, connect the service to it (swapping the local storage for a real database repository), and start the app + database together with one command using Docker Compose.

## 🚀 Features
* **Dockerized Stack:** Both the API and the Database run in isolated Docker containers via `docker-compose.yml`.
* **PostgreSQL:** Replaced SQLite with an enterprise-grade Postgres database using the `pg` library.
* **MVC Architecture:** The code is cleanly split into Models, Views, and Controllers. Changing to Postgres only required modifying the Model file; the Controllers and Routes remained completely untouched.
* **Environment Variables:** Secure connection strings are loaded from a `.env` file (which is git-ignored, with a `.env.example` provided).

## 💻 How to Run
1. Ensure Docker Desktop is running on your machine.
2. In this folder, copy `.env.example` to `.env` (the defaults are already set for Docker).
3. Start the entire stack with one command:
   ```bash
   docker compose up -d --build
   ```
4. Test the API at `http://localhost:3000/docs`.

## 🛡️ Proving Persistence
Data persistence was proven by:
1. Creating several tasks via the API.
2. Destroying the containers using `docker compose down`.
3. Rebuilding the containers using `docker compose up -d`.
4. Fetching the tasks via `GET /tasks` and confirming the previously created rows were still there, thanks to the mapped Docker Volume (`pgdata`).
