import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/photos";

export async function getAllPhotos() {
  const res = await axios.get(API_BASE_URL);
  return res.data;
}

export async function savePhoto({ title, description, file }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", file);

  const res = await axios.post(API_BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getPhotoById(id) {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
}

export async function deletePhoto(id) {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
}
