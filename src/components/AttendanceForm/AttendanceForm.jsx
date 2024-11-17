import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AttendenceForm.css";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/attendance`;

const AttendanceForm = ({ classId, students = [], ClassDetail }) => {
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.username.toLowerCase().includes(searchStudent.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchStudent, students]);

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

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Student (Name)"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
        />
      </div>

      <label className="attendance-date-label">Date:</label>
      <input
        type="date"
        className="attendance-date-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="attendance-schedule">
        <div className="attendance-header">
          <div className="attendance-column">Student Name</div>
          <div className="attendance-column">Status</div>
        </div>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div className="attendance-row" key={student._id}>
              <div className="attendance-column">{student.username}</div>
              <div className="attendance-column">
                <select
                  className="attendance-select"
                  onChange={(e) =>
                    handleAttendanceChange(student._id, e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="attendance-row">
            <div className="attendance-column" colSpan="2">
              No students enrolled or no matches found for your search criteria.
            </div>
          </div>
        )}
      </div>

      <button className="attendance-button" onClick={submitAttendance}>
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;
