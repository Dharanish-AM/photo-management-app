import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import UploadForm from "./components/UploadForm.jsx";
import Gallery from "./components/Gallery.jsx";
import PhotoDetail from "./components/PhotoDetail.jsx";
import {
  deletePhoto,
  getAllPhotos,
  savePhoto,
} from "./services/photoService.js";

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function loadPhotos() {
      const data = await getAllPhotos();
      setPhotos(Array.isArray(data) ? data : []);
    }
    loadPhotos();
  }, []);

  const handleUpload = async (data) => {
    const newPhoto = await savePhoto(data);
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await deletePhoto(id);
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete photo");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-wide hover:text-blue-400 transition"
          >
            Photo Manager
          </Link>
          <div className="flex gap-6">
            <Link
              to="/upload"
              className="hover:text-blue-400 transition font-medium"
            >
              Upload
            </Link>
            <Link
              to="/gallery"
              className="hover:text-blue-400 transition font-medium"
            >
              Gallery
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={<UploadForm onUpload={handleUpload} />}
          />
          <Route path="/gallery" element={<Gallery photos={photos} />} />
          <Route
            path="/photo/:id"
            element={<PhotoDetail photos={photos} onDelete={handleDelete} />}
          />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">
        Welcome to <span className="text-blue-600">Photo Manager</span>
      </h1>
      <p className="text-gray-600 mb-8 max-w-lg text-lg">
        Upload your photos, organize them, and view them anytime.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          Upload Photo
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          View Gallery
        </button>
      </div>
    </div>
  );
}
