const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const { UserUpload } = require("../models/userUploadModel");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "requests/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const uploadModel = async (req, res) => {
  try {
    console.log(req.file);
    const { filename, path } = req.file;
    const { userId, title, info, thumbnail } = req.body;

    await UserUpload.create({
      userId: userId,
      title: title,
      info: info,
      thumbnail: thumbnail,
      path: path,
    });
    res.status(200).json({ message: "Model Uploaded Successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const getUserUploads = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const userUploads = await UserUpload.find({ userId: userId });
    res.status(200).json({ userUploads });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
};

const deleteUserUploads = async (req, res) => {
  const id = req.query.id;
  try {
    await UserUpload.deleteOne({ _id: id });
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const rejectRequest = async (req, res) => {
  try {
    console.log(req.body.id);
    const id = req.body.id;
    filePath = `./requests/${req.body.filename}`;
    fs.unlinkSync(filePath);
    await UserUpload.findByIdAndUpdate(id, { status: "Rejected" });
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  uploadModel,
  getUserUploads,
  deleteUserUploads,
  rejectRequest,
  upload,
};
