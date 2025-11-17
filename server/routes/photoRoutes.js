const express = require("express");
const {
  uploadPhoto,
  getPhotos,
  getPhotoById,
} = require("../controllers/photoController.js");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", getPhotos);
router.get("/:id", getPhotoById);
router.post("/", upload.single("file"), uploadPhoto);

module.exports = router;