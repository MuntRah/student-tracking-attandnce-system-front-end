import { useEffect, useState } from "react";
import { getClassStudentAttendance } from "../../services/classStudentService";

const ClassStudentAttendance = ({ classId, studentId }) => {
  const [classData, setClassData] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassStudentAttendance = async () => {
      try {
        const data = await getClassStudentAttendance(classId, studentId);
        setClassData(data.classData);
        setAttendanceRecords(data.attendanceRecords);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching class and student attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassStudentAttendance();
  }, [classId, studentId]);

  if (loading) return <p>Loading class and student attendance...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Class and Student Attendance</h1>
      {classData && (
        <div>
          <h2>Class: {classData.className}</h2>
          <p>
            Teacher: {classData.teacherId.username} ({classData.teacherId.email}
            )
          </p>
          <h3>Students:</h3>
          <ul>
            {classData.students.map((student) => (
              <li key={student._id}>
                {student.username} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3>Attendance Records:</h3>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for this student.</p>
      ) : (
        <ul>
          {attendanceRecords.map((record) => (
            <li key={record._id}>
              {record.date} - {record.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassStudentAttendance;
