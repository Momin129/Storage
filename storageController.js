const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const { Paintings, Sculptures, Artifacts, Demo } = require("./storageModel");
const baseUrl = "http://localhost:4242";

mongoose.connect(
  "mongodb+srv://websiterandom24:g0X6LRyonXRjdcvC@cluster0.tmamprp.mongodb.net/ArtVista?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const uploadModel = async (req, res) => {
  try {
    const { filename, path } = req.file;
    const { title, info, thumbnail, type } = req.body;

    let Schema;
    if (type == "painting") Schema = Paintings;
    else if (type == "sculpture") Schema = Sculptures;
    else if (type == "artifact") Schema = Artifacts;
    else Schema = Demo;

    const addModel = await Schema.create({
      title: title,
      info: info,
      filename: filename,
      thumbnail: thumbnail,
      path: path,
    });
    res.status(200).json({ addModel });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getModel = async (req, res) => {
  const type = req.query.type;
  let Schema;
  if (type == "painting") Schema = Paintings;
  else if (type == "sculpture") Schema = Sculptures;
  else if (type == "artifact") Schema = Artifacts;
  else Schema = Demo;

  try {
    const getmodel = await Schema.find();
    res.status(200).json(getmodel);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const deleteModel = async (req, res) => {
  const filePath = `${baseUrl}/uploads/${req.query.filename}`;
  const id = new mongoose.Types.ObjectId(req.query.id);
  const type = req.query.type;

  let Schema;
  if (type == "painting") Schema = Paintings;
  else if (type == "sculpture") Schema = Sculptures;
  else if (type == "artifact") Schema = Artifacts;
  else Schema = Demo;

  console.log(filePath);
  try {
    fs.unlink(filePath);
    await Schema.deleteOne({ _id: id });
    res.json("File  deleted successfully.");
  } catch (err) {
    res.json("File does not exists.");
  }
};

module.exports = { uploadModel, upload, getModel, deleteModel };