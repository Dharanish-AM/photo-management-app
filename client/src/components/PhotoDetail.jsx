import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhotoDetail({ photos, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const photo = photos.find((p) => p.id === id);
  if (!photo) return <p className="text-center mt-10">Not Found</p>;

  return (
    <div className="relative flex flex-col items-center justify-center mt-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-4 sm:p-6 border border-gray-200">
        <div className="flex w-full items-center justify-between gap-2 z-50">
          <button
            className="flex cursor-pointer items-center gap-1 bg-white shadow-sm border border-gray-300 hover:bg-gray-100 text-blue-600 px-3 py-1.5 rounded-lg font-medium transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="flex cursor-pointer items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-medium shadow transition"
            onClick={async () => {
              if (!confirm("Are you sure you want to delete this photo?")) return;
              try {
                await onDelete(photo.id);
                navigate("/gallery");
              } catch (err) {
                console.log("Delete failed:", err);
                alert("Failed to delete photo");
              }
            }}
          >
            Delete
          </button>
        </div>
        <div className="relative overflow-hidden rounded-lg group max-w-2xl mx-auto">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full max-h-[50vh] md:max-h-[45vh] object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>

        <h2 className="text-3xl font-bold mt-6 text-gray-900 tracking-tight">
          {photo.title}
        </h2>

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
