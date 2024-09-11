import { useEffect, useState } from "react";
import { getAttendance } from "../services/attendanceService";

const AttendanceList = ({ classId }) => {
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
      <h1>Attendance Records</h1>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul>
          {attendance.map((record) => (
            <li key={record._id}>
              {record.studentId.username} - {record.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList;
