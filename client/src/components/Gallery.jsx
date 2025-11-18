import React from "react";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo }) => {
  return (
    <Link
      to={`/photo/${photo.id}`}
      className="group relative block w-full aspect-4/3 rounded-xl overflow-hidden shadow-xl 
                 transform transition duration-500 hover:scale-[1.03] hover:shadow-2xl hover:ring-4 hover:ring-blue-500/50"
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-full object-cover transition duration-500 group-hover:opacity-80 group-hover:blur-[2px]"
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent 
                   flex items-end p-5 transition duration-500"
      >
        <div className="transform translate-y-2 group-hover:translate-y-0 transition duration-300">
          <h3 className="text-white text-xl font-bold truncate transition duration-300">
            {photo.title}
          </h3>
          <p className="text-blue-200 text-sm opacity-0 group-hover:opacity-100 transition duration-300">
            View Details
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function Gallery({ photos }) {
  if (photos.length === 0) {
    return (
      <div className="text-center p-16 bg-white rounded-xl shadow-lg mt-10 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Empty Gallery
        </h2>
        <p className="text-gray-500 text-lg">
          It looks like you haven't uploaded any photos yet.
        </p>
        <Link
          to="/upload"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
        >
          Start Uploading Now!
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Collection 📸
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
