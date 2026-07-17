import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Todo List API",
    version: "1.0.0",
    endpoint: "/todos",
  });
});
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
