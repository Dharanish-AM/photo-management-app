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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      setIsLoading(true);
      try {
        const data = await getAllPhotos();

        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load initial photos:", error);
      } finally {
        setIsLoading(false);
      }
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
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white w-screen text-gray-800 shadow-xl sticky top-0 z-20">
        <nav className="mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-black tracking-wide text-blue-600 hover:text-blue-800 transition transform hover:scale-[1.02]"
          >
            Photo Manager
          </Link>
          <div className="flex gap-4 sm:gap-6">
            <NavLink to="/upload" label="Upload" />
            <NavLink to="/gallery" label="Gallery" />
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={<UploadForm onUpload={handleUpload} />}
          />
          <Route
            path="/gallery"
            element={isLoading ? <LoadingState /> : <Gallery photos={photos} />}
          />
          <Route
            path="/photo/:id"
            element={<PhotoDetail photos={photos} onDelete={handleDelete} />}
          />
        </Routes>
      </main>
    </div>
  );
}

const NavLink = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center text-gray-700 font-semibold px-3 py-2 rounded-lg 
                       hover:bg-blue-50 hover:text-blue-600 transition duration-300 transform hover:scale-105"
    >
      <span className="text-lg mr-2">{icon}</span> {label}
    </Link>
  );
};

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24 bg-white p-12 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-700">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tighter">
        Welcome to{" "}
        <span className="text-blue-600 drop-shadow-md">Photo Manager</span>
      </h1>
      <p className="text-gray-600 mb-10 max-w-xl text-xl italic">
        The clean, organized way to manage your digital memories, built with
        React and Tailwind.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-sm">
        <button
          onClick={() => navigate("/upload")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
                     transition duration-300 transform hover:scale-[1.05] hover:ring-4 hover:ring-blue-500/50"
        >
          Upload Photo
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-5 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl 
                     transition duration-300 transform hover:scale-[1.05]"
        >
          View Gallery
        </button>
      </div>
    </div>
  );
}

const LoadingState = () => (
  <div className="flex justify-center items-center h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
    <p className="ml-4 text-blue-600 text-lg font-medium">
      Fetching your memories...
    </p>
  </div>
);
