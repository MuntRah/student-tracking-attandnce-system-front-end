import { useEffect, useState, useContext } from "react";
import { getClassStudentAttendance } from "../../services/classStudentService";
import { AuthedUserContext } from "../../App";
import { formatDate } from "../../utils/dateFormatter";
const ClassStudentAttendance = ({ classId }) => {
  const user = useContext(AuthedUserContext);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassStudentAttendance = async () => {
      try {
        const data = await getClassStudentAttendance(classId, user._id);
        setAttendanceRecords(data.attendanceRecords);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching class and student attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassStudentAttendance();
  }, [classId, user._id]);

  if (loading) return <p>Loading attendance records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Attendance Records</h1>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for this student.</p>
      ) : (
        <ul>
          {attendanceRecords.map((record) => (
            <li key={record._id}>
              {formatDate(record.date)} - {record.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassStudentAttendance;