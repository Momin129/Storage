const express = require("express");
const {
  uploadModel,
  getModel,
  deleteModel,
  upload,
} = require("./storageController");

const router = express.Router();

router.post("/upload", upload.any(), uploadModel);
router.get("/getModel", getModel);
router.get("/delete", deleteModel);

module.exports = router;
