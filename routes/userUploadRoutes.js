const express = require("express");
const {
  uploadModel,
  upload,
  getUserUploads,
  rejectRequest,
  deleteUserUploads,
} = require("../controllers/userUploadControllers");

const router = express.Router();

router.post("/userUpload", upload.single("file"), uploadModel);
router.get("/userUploads", getUserUploads);
router.get("/deleteUserUploads", deleteUserUploads);
router.post("/rejectRequest", rejectRequest);

module.exports = router;
