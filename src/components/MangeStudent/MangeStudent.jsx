import { useEffect, useState } from "react";
import axios from "axios";
import "./MangeStudent.css";

const BACKEND_URL = `${
  import.meta.env.VITE_EXPRESS_BACKEND_URL
}/admin/users/student`;

const MangeStudent = () => {
  const [Students, setStudents] = useState([]);
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
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching class details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p className="loading-message">Loading students...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="student-list-container">
      <h1>Students List</h1>
      {Students.length === 0 ? (
        <p>No Students found.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Students.map((Student) => (
              <tr key={Student._id}>
                <td className="student-name">{Student.username}</td>
                <td className="student-email">{Student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MangeStudent;
