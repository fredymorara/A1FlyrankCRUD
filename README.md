# FlyRank CRUD API

A simple in-memory REST API to manage a to-do list, built with Node.js and Express.

## How to install and run
To run this project locally, clone the repository and run:
```bash
npm install
node index.js
```
The server will start on `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/` | Returns API info |
| GET | `/health` | Returns server health status |
| GET | `/tasks` | Lists all tasks |
| GET | `/tasks/:id` | Gets a single task by ID |
| POST | `/tasks` | Creates a new task (requires title) |
| PUT | `/tasks/:id` | Updates a task (title or done status) |
| DELETE | `/tasks/:id` | Deletes a task |

## Example Request
Here is what happens when you create a task via curl:

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Delete me later\"}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-xkkHcwFB8GFa7XCOp+pQl+oDtwQ"
Date: Fri, 17 Jul 2026 20:43:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Delete me later","done":false}
```

## Swagger UI
You can interact with the API visually by running the server and visiting `http://localhost:3000/docs`.

![Swagger UI Screenshot](./swagger.png)
