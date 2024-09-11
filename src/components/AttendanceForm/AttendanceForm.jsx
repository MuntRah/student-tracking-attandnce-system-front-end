import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/attendance`;

const AttendanceForm = ({ classId, students = [] }) => {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Today's date
  const token = localStorage.getItem("token");

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/new/${classId}`,
        {
          attendanceRecords,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Attendance marked successfully");
    } catch (err) {
      console.error("Error marking attendance:", err);
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id}>
              {student.username}
              <select
                onChange={(e) =>
                  handleAttendanceChange(student._id, e.target.value)
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </li>
          ))
        ) : (
          <li>No students enrolled</li>
        )}
      </ul>
      <button onClick={submitAttendance}>Submit Attendance</button>
    </div>
  );
};

export default AttendanceForm;
