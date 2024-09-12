import { useEffect, useState } from "react";
import axios from "axios";
import "./MangeTeacher.css"; 
const BACKEND_URL = `${
  import.meta.env.VITE_EXPRESS_BACKEND_URL
}/admin/users/teacher`;

const MangeTeacher = () => {
  const [Teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching teacher details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p className="loading-message">Loading teachers...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="teacher-list-container">
      <h1>Teachers List</h1>
      {Teachers.length === 0 ? (
        <p>No Teachers found.</p>
      ) : (
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((Teacher) => (
              <tr key={Teacher._id}>
                <td className="teacher-name">{Teacher.username}</td>
                <td className="teacher-email">{Teacher.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MangeTeacher;
