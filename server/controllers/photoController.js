const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

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

  const newPhoto = {
    id: String(Date.now()),
    title: req.body.title,
    description: req.body.description,
    url: `${process.env.SERVER_URL}/${req.file.path}`,
    createdAt: new Date().toISOString(),
  };

  photos.unshift(newPhoto);
  saveDB(photos);

  res.status(201).json(newPhoto);
}

function deletePhoto(req, res) {
  const photos = loadDB();
  const filtered = photos.filter((p) => p.id !== req.params.id);

  if (filtered.length === photos.length) {
    return res.status(404).json({ error: "Photo not found" });
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
