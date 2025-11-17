const API_BASE_URL = import.meta.env.VITE_API_URL + "/photos";

export async function getAllPhotos() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch photos");
  return res.json();
}

export async function savePhoto({ title, description, file }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  const res = await fetch(API_BASE_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload photo");
  return res.json();
}

export async function getPhotoById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Photo not found");
  return res.json();
}
