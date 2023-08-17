const express = require("express");
const {
  uploadModel,
  upload,
  getModel,
  deleteModel,
} = require("./storageController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadModel);
router.get("/getModel", getModel);
router.get("/delete", deleteModel);

module.exports = router;
