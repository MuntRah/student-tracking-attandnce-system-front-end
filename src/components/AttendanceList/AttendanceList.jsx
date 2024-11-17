import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendance } from "../../services/attendenceService";
import { formatDate } from "../../utils/dateFormatter";
import "./AttendenceList.css";

const AttendanceList = () => {
  const { classId } = useParams();
  const [attendanceByStudent, setAttendanceByStudent] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance(classId);
        const attendanceByStudent = data.reduce((acc, record) => {
          const { studentId } = record;
          if (!acc[studentId.username]) {
            acc[studentId.username] = [];
          }
          acc[studentId.username].push({
            date: record.date,
            status: record.status,
          });
          return acc;
        }, {});
        setAttendanceByStudent(attendanceByStudent);
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
    <div className="attendance-container">
      <h1 className="attendance-header">Attendance Records for the Class</h1>
      {Object.keys(attendanceByStudent).length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        Object.keys(attendanceByStudent).map((studentName) => (
          <div key={studentName} className="student-attendance-container">
            <h2 className="student-name">{studentName}</h2>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceByStudent[studentName].map((record, index) => (
                  <tr key={index}>
                    <td>{formatDate(record.date)}</td>
                    <td
                      className={`attendance-status ${
                        record.status.toLowerCase() === "present" ? "present" : "absent"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceList;