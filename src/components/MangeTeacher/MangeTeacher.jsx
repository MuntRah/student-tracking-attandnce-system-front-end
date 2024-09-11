import { useEffect, useState } from "react";
import axios from "axios";

// Correct BACKEND_URL definition
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
        // Correct the Authorization header
        const response = await axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // Correct the token format
          },
        });
        setTeachers(response.data); // Set fetched data
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
      <h1>Teachers List</h1>
      {Teachers.length === 0 ? (
        <p>No Teachers found.</p>
      ) : (
        <ul>
          {Teachers.map((Teacher) => (
            <li key={Teacher._id}>
              {Teacher.username} - {Teacher.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MangeTeacher;
