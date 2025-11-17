import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhotoDetail({ photos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const photo = photos.find(p => p.id === id);
  if (!photo) return <p className="text-center mt-10">Not Found</p>;

  return (
    <div className="text-center">
      <button className="mb-4 underline" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <img
        src={photo.url}
        alt={photo.title}
        className="max-h-[75vh] mx-auto rounded-lg shadow"
      />
      <h2 className="text-2xl font-semibold mt-4">{photo.title}</h2>
      {photo.description && (
        <p className="text-gray-600 mt-1">{photo.description}</p>
      )}
    </div>
  );
}