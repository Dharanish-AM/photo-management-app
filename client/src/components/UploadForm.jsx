
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, title, message, isSuccess, goToGallery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm transform scale-100 transition duration-300">
        <div className="flex flex-col items-center text-center">
          <div
            className={`text-5xl mb-4 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {isSuccess ? "✅" : "❌"}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>

          {isSuccess ? (
            <button
              onClick={goToGallery}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Go to Gallery
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function UploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      alert("Please fill all fields and select a file.");
      return;
    }

    setIsSubmitting(true);
    try {
      
      await onUpload({ title, description, file });

      setModalState({
        isOpen: true,
        isSuccess: true,
        title: "Upload Complete!",
        message: "Your photo has been successfully added to the collection.",
      });

      
      setTitle("");
      setDescription("");
      setFile(null);
      if (document.getElementById("file-input")) {
        document.getElementById("file-input").value = null;
      }
    } catch (error) {
      console.error("Upload error:", error);
      setModalState({
        isOpen: true,
        isSuccess: false,
        title: "Upload Failed",
        message:
          "There was an error saving your photo. Please check the console.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToGallery = () => {
    setModalState({ ...modalState, isOpen: false });
    navigate("/gallery");
  };

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-2xl space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <h2 className="text-3xl font-bold text-gray-800 text-center border-b pb-4">
          Upload Your Masterpiece
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="e.g., A Sunset over the Himalayas"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
              placeholder="Tell us about your photo..."
            ></textarea>
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-300">
            <label
              htmlFor="file-input"
              className="block text-center text-sm font-medium text-gray-700 cursor-pointer"
            >
              Click to select file
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              required
              accept="image/*"
              className="hidden"
            />
            {file && (
              <p className="mt-2 text-center text-xs text-blue-600 font-medium truncate">
                Selected: **{file.name}**
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white 
                        transform hover:scale-[1.01] transition duration-300
                        ${
                          isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Uploading...
              </span>
            ) : (
              "Start Upload"
            )}
          </button>
        </form>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        isSuccess={modalState.isSuccess}
        goToGallery={goToGallery}
      />
    </>
  );
}
