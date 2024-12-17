const express = require("express");

const app = express();
const port = 3000;

// middleware
app.use(express.json());

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
