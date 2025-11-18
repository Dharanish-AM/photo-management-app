const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DB_PATH = "./photos.json";

function loadDB() {
  if (!fs.existsSync(DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getPhotos(req, res) {
  return res.json(loadDB());
}

function getPhotoById(req, res) {
  const photos = loadDB();
  const photo = photos.find((p) => p.id === req.params.id);
  if (!photo) return res.status(404).json({ error: "Not found" });
  return res.json(photo);
}

function uploadPhoto(req, res) {
  const photos = loadDB();

  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.error("Cloudinary upload error:", err);
      return res.status(500).json({ error: "Cloudinary upload failed", details: err.message });
    }

    const newPhoto = {
      id: String(Date.now()),
      title: req.body.title,
      description: req.body.description,
      url: result.secure_url,
      publicId: result.public_id,
      createdAt: new Date().toISOString(),
    };

    photos.unshift(newPhoto);
    saveDB(photos);

    return res.status(201).json(newPhoto);
  });
}

async function deletePhoto(req, res) {
  const photos = loadDB();
  const filtered = photos.filter((p) => p.id !== req.params.id);

  if (filtered.length === photos.length) {
    return res.status(404).json({ error: "Photo not found" });
  }
  const deleted = photos.find((p) => p.id === req.params.id);
  if (deleted && deleted.publicId) {
    try {
      await cloudinary.uploader.destroy(deleted.publicId);
    } catch (err) {
      console.error("Cloudinary delete error:", err);
    }
  }
  saveDB(filtered);
  return res.json({ success: true, message: "Photo deleted" });
}

module.exports = {
  getPhotos,
  getPhotoById,
  uploadPhoto,
  deletePhoto,
};
