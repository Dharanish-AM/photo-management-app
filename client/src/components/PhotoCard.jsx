import React from "react";
import { useNavigate } from "react-router-dom";

export default function PhotoCard({ photo }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer shadow hover:shadow-lg rounded-lg overflow-hidden bg-white"
      onClick={() => navigate(`/photo/${photo.id}`)}
    >
      <img src={photo.url} alt={photo.title} className="w-full h-36 object-cover" />
      <div className="p-2">
        <p className="text-sm font-medium">{photo.title}</p>
      </div>
    </div>
  );
}