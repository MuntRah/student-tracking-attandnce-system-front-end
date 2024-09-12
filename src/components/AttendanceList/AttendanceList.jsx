import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendance } from "../../services/attendenceService";
import { formatDate } from "../../utils/dateFormatter";
const AttendanceList = () => {
  const { classId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance(classId);
        setAttendance(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [classId]);

  if (loading) return <p>Loading attendance...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Attendance Records for the Class</h1>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul>
          {attendance.map((record) => (
            <li key={record._id}>
              {record.studentId.username} - {formatDate(record.date)} -{" "}
              {record.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList;
