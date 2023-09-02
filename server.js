// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/requests", express.static("requests"));

app.use("/api", require("./routes/storageRoutes"));
app.use("/api", require("./routes/userUploadRoutes"));

const PORT = 4242;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
