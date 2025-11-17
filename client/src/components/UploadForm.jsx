import React, { useState } from "react";

export default function UploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!file || !title.trim()) return;
    onUpload({ title, description, file });
    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Photo</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          className="border p-2 rounded"
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          className="border p-2 rounded"
          onChange={e => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={!file}
          className="bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
        >
          Upload
        </button>
      </form>
    </div>
  );
}