import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AttendenceForm.css";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/attendance`;

const AttendanceForm = ({ classId, students = [], ClassDetail }) => {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      navigate(`/class/${classId}/view-attendance`);
    } catch (err) {
      console.error("Error marking attendance:", err);
    }
  };

  return (
    <div className="attendance-form-container">
      <h2 className="attendance-form-header">Mark Attendance</h2>
      <label className="attendance-date-label">Date:</label>
      <input
        type="date"
        className="attendance-date-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ul className="attendance-list">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id}>
              <span className="attendance-student-name">
                {student.username}
              </span>
              <select
                className="attendance-select"
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
      <button className="attendance-button" onClick={submitAttendance}>
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;
