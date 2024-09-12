import { useEffect, useState, useContext } from "react";
import { getClassStudentAttendance } from "../../services/classStudentService";
import { AuthedUserContext } from "../../App";
import { formatDate } from "../../utils/dateFormatter";
import "./ClassStudentAttendence.css";

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
    <div className="class-student-attendance-container">
      <h1 className="attendance-header">Attendance Records</h1>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for this student.</p>
      ) : (
        <ul className="attendance-list">
          {attendanceRecords.map((record) => (
            <li key={record._id}>
              <span className="attendance-date">{formatDate(record.date)}</span>
              <span
                className={`attendance-status ${record.status.toLowerCase()}`}
              >
                {record.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassStudentAttendance;
