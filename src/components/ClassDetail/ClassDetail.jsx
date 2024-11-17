import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import AttendanceForm from "../AttendanceForm/AttendanceForm";
import ClassStudentAttendance from "../ClassStudentAttendance/ClassStudentAttendance";
import "./ClassDetail.css";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/class`;

const ClassDetail = () => {
  const user = useContext(AuthedUserContext);
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/${classId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassDetails(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching class details:", err);
      }
    };

    fetchClassDetails();
  }, [classId, token]);

  return (
    <div className="class-detail-container">
      <h2 className="class-detail-header">Class Details</h2>
      {error && <div className="error-message">Error: {error}</div>}
      {!classDetails ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="class-info">
            <ul className="class-details-list">
              <li>
                <strong>Class Code:</strong> {classDetails.classCode}
              </li>
              <li>
                <strong>Class Name:</strong> {classDetails.className}
              </li>
              <li>
                <strong>Teacher:</strong> {classDetails.teacherId?.username || "No teacher assigned"}
              </li>
            </ul>
          </div>
          
          {user.role === "teacher" && (
            <div className="students-schedule-container">
              <div className="students-list">
                <p className="students-header">
                  <strong>Students:</strong>
                </p>
                {classDetails.students.length > 0 ? (
                  <ul>
                    {classDetails.students.map((student) => (
                      <li key={student._id} className="student-item">
                        <span className="student-name">
                          Name: {student.username}
                        </span>
                        <span className="student-email">
                          Email: {student.email}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No students enrolled</p>
                )}
              </div>
              <div className="schedule-list">
                <strong>Schedule:</strong>
                {classDetails.schedule.length > 0 ? (
                  <ul>
                    {classDetails.schedule.map((slot, index) => (
                      <li key={index} className="schedule-item">
                        <div>Day: {slot.day}</div>
                        <div>Start Time: {slot.startTime}</div>
                        <div>End Time: {slot.endTime}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No schedule available"
                )}
              </div>
            </div>
          )}
          
          <div className="actions">
            {user.role === "teacher" ? (
              <>
                <AttendanceForm
                  classId={classId}
                  students={classDetails.students}
                  ClassDetail={classDetails}
                />
                <Link
                  to={`/class/${classId}/view-attendance`}
                  className="view-attendance-link"
                >
                  View Attendance Records
                </Link>
              </>
            ) : user.role === "student" ? (
              <ClassStudentAttendance classId={classId} />
            ) : (
              <p>Access denied</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassDetail;
