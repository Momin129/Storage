const express = require("express");
const {
  uploadModel,
  getModel,
  deleteModel,
  upload,
  rejectRequest,
} = require("./storageController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadModel);
router.get("/getModel", getModel);
router.get("/delete", deleteModel);

module.exports = router;
