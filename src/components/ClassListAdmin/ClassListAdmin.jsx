import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ClassListAdmin.css"; // Import the CSS file

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/admin/class`;

const ClassList = () => {
  const [classes, setClasses] = useState([]);
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
        setClasses(response.data); // Set fetched data
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
    <div className="class-list-container">
      <h1>Class List</h1>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <table className="class-list-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Class Code</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td>
                  <Link to={`/admin/class/${classItem._id}`}>
                    {classItem.className}
                  </Link>
                </td>
                <td>{classItem.classCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassList;
