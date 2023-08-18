// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api", require("./storageRoutes"));

const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
