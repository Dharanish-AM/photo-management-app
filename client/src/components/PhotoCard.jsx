import React from "react";
import { useNavigate } from "react-router-dom";

export default function PhotoCard({ photo }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/photo/${photo.id}`)}
      className="group relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-full h-40 bg-gray-200 overflow-hidden">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 opacity-90">
        <p className="text-white font-semibold text-sm truncate drop-shadow-md">
          {photo.title}
        </p>
      </div>
    </div>
  );
}