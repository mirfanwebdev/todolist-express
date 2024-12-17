const express = require("express");
const todoRoutes = require("./routes/todo");

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/todos", todoRoutes);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
