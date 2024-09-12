import axios from "axios";
const BACKEND_URL = `${
  import.meta.env.VITE_EXPRESS_BACKEND_URL
}/class-attendance`;

export const getClassStudentAttendance = async (classId, studentId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/${classId}/student/${studentId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching class and student attendance:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch class and student attendance"
    );
  }
};