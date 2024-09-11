import axios from "axios";
const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/admin/class`;

export const newClass = async (classData) => {
  const response = await axios.post(`${BACKEND_URL}/new`, classData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateClass = async (classId, classData) => {
  const response = await axios.put(`${BACKEND_URL}/${classId}`, classData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const deleteClass = async (classId) => {
  const response = await axios.delete(`${BACKEND_URL}/${classId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
