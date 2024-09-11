import { useEffect, useState } from "react";
import axios from "axios";

// Correct BACKEND_URL definition
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
        // Correct the Authorization header
        const response = await axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Correct the token format
          },
        });
        setStudents(response.data); // Set fetched data
      } catch (err) {
        setError(err.message); // Capture any error
        console.error("Error fetching class details:", err);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Students List</h1>

      {Students.length === 0 ? (
        <p>No Students found.</p>
      ) : (
        <ul>
          {Students.map((Student) => (
            <li key={Student._id}>
              {Student.username} - {Student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MangeStudent;
