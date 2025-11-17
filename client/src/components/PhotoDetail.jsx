import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhotoDetail({ photos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const photo = photos.find(p => p.id === id);
  if (!photo) return <p className="text-center mt-10">Not Found</p>;

  return (
    <div className="relative flex flex-col items-center justify-center mt-10 px-4">
      <div className="absolute top-4 left-4 flex gap-3">
        <button
          className="bg-white/90 hover:bg-white text-blue-600 border border-blue-500 px-3 py-1.5 rounded-lg font-medium shadow transition flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span> Back
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-medium shadow transition"
          onClick={() => alert('Delete handler not implemented yet')}
        >
          🗑 Delete
        </button>
      </div>

      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <div className="relative overflow-hidden rounded-xl group">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full max-h-[75vh] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <h2 className="text-3xl font-bold mt-6 text-gray-900 tracking-tight">{photo.title}</h2>

        {photo.description && (
          <p className="text-gray-600 mt-3 text-lg leading-relaxed">
            {photo.description}
          </p>
        )}

        <p className="text-gray-400 text-sm mt-4 italic">
          Uploaded: {new Date(photo.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}