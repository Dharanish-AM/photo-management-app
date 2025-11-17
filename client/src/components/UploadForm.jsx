import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    success: true,
    message: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    try {
      await onUpload({ title, description, file });
      setModal({
        open: true,
        success: true,
        message: "Photo uploaded successfully!",
      });
    } catch (err) {
      console.error("Upload failed:", err);
      setModal({
        open: true,
        success: false,
        message: "Upload failed. Please try again.",
      });
    }

    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight flex items-center gap-2">
        Upload Photo
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-gray-700 font-medium">Select Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-gray-700 font-medium">Title</span>
          <input
            type="text"
            placeholder="Enter a memorable title..."
            value={title}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-gray-700 font-medium">Description</span>
          <textarea
            placeholder="Write something about this photo (optional)"
            value={description}
            className="border p-3 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={!file}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Upload
        </button>

        {file && (
          <p className="text-sm text-green-600 font-medium text-center">
            ✔ Image selected & ready to upload
          </p>
        )}
      </form>
      {/* Modal UI */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3
              className={`text-xl font-bold ${
                modal.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.success ? "Success 🎉" : "Error ❌"}
            </h3>
            <p className="mt-2 text-gray-700">{modal.message}</p>

            <div className="flex flex-col gap-3 mt-5">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                onClick={() => {
                  setModal({ open: false, success: true, message: "" });
                  navigate("/gallery");
                }}
              >
                Go to Gallery
              </button>

              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition"
                onClick={() =>
                  setModal({ open: false, success: true, message: "" })
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
