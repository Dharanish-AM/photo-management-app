import React from "react";
import PhotoCard from "./PhotoCard";

export default function Gallery({ photos }) {
  if (!Array.isArray(photos) || photos.length === 0)
    return (
      <div className="text-center mt-24">
        <p className="text-gray-500 text-lg">No photos uploaded yet.</p>
        <p className="text-gray-400">Try uploading one! 📤</p>
      </div>
    );

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">📷 Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="transform hover:scale-105 transition duration-200">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>
    </div>
  );
}