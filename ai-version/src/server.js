import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Swagger Docs setup
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root & Health Endpoints
app.get("/", (req, res) => {
  res.json({
    name: "AI Todo List API (MVC Architecture)",
    version: "2.0.0",
    endpoints: ["/tasks", "/docs"]
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Task Routes
app.use("/tasks", taskRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running in MVC mode at http://localhost:${port}`);
});
