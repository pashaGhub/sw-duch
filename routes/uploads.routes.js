const { Router } = require("express");
const { Types } = require("mongoose");
const Uploads = require("../models/Uploads");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const router = Router();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imgFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImg = multer({
  storage: storage,
  onError: function (err, next) {
    next(err);
  },
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: imgFilter,
});

// /api/uploads/img - upload images
router.post("/img", auth, uploadImg.single("file"), async (req, res, next) => {
  try {
    const newUpload = new Uploads({
      _id: new Types.ObjectId(),
      path: req.file.path,
    });

    await newUpload.save();
    res.status(201).json({ message: "Image successfully uploaded!" });
  } catch (e) {
    res.status(500).json({
      message: e ? e.message : "Something went wrong in /uploads/img",
      error: e,
    });
  }
});

// /api/uploads/img - get images
router.get("/img", async (req, res) => {
  try {
    const getImg = await Uploads.find();

    res.json(getImg);
  } catch (e) {
    res.status(500).json({
      message: e ? e.message : "Something went wrong in get uploads/img",
    });
  }
});

//delete image
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Uploads.findByIdAndDelete(req.params.id);
    fs.unlinkSync(item.path);
    res.status(201).json({ message: "File successfully deleted!" });
  } catch (e) {
    res
      .status(500)
      .json({ message: e ? e.message : "Something went wrong in delete file" });
  }
});

module.exports = router;
