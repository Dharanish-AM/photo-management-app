import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PhotoDetail({ photos, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return (
      <div className="text-center p-16 bg-red-50 text-red-700 rounded-xl shadow-lg mt-10">
        ❌ Photo Not Found
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 block mx-auto text-blue-600 hover:underline"
        >
          Go back to Gallery
        </button>
      </div>
    );
  }

  const handleDeleteClick = async () => {
    if (
      !confirm(
        `Are you sure you want to delete "${photo.title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(photo.id);
      navigate("/gallery", { replace: true });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete photo");
      setIsDeleting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="sticky top-0 z-10 bg-white p-4 mb-6 rounded-xl shadow-lg flex justify-between items-center border-b border-gray-100 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300 font-semibold px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Back to Gallery
        </button>

        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className={`flex items-center py-2 px-4 rounded-lg text-white font-semibold shadow-md transition duration-300 
                      ${
                        isDeleting
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
                      }`}
        >
          {isDeleting ? "Deleting..." : "Delete Photo"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center border-b pb-4">
          {photo.title}
        </h1>

        <div className="mb-8 w-full h-full overflow-hidden rounded-xl shadow-2xl group">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-contain mx-auto transition duration-500 transform group-hover:scale-[1.01]"
          />
        </div>

        <div className="space-y-6">
          {photo.description && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-inner">
              <h3 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                {photo.description}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center text-sm p-3 border-b border-gray-100">
            <span className="font-medium text-gray-500">Uploaded At:</span>
            <span className="font-semibold text-gray-700">
              {formatDate(photo.createdAt)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm p-3">
            <span className="font-medium text-gray-500">Photo ID:</span>
            <span className="text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded-md">
              {photo.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
