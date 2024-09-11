import { useEffect, useState } from "react";
import axios from "axios";


const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/class`;

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
        setClasses(response.data);
      } catch (err) {
        setError(err.message); 
        console.error("Error fetching class details:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Class List</h1>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem._id}>
              {classItem.className} - {classItem.classCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassList;
