import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import * as attendanceService from "../../services/attendenceService";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/attendance/new`;

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [newAttendance, setNewAttendance] = useState({ studentId: '', date: '', status: 'Present' });
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token"); 
  const user = { role: 'teacher' };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendanceRecords(response.data); 
      } catch (err) {
        setError(err.message);
        console.error("Error fetching attendance records:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'teacher') {
      fetchData();
    }
  }, [token, user]);

  const handlePostAttendance = async () => {
    try {
      await attendanceService.postAttendance(newAttendance);
      fetchData(); 
    } catch (error) {
      console.error('Failed to post attendance:', error);
    }
  };

  const handleUpdateAttendance = async (id, updatedData) => {
    try {
      await attendanceService.updateAttendance(id, updatedData);
      fetchData(); 
    } catch (error) {
      console.error('Failed to update attendance:', error);
    }
  };

  if (!user || user.role !== 'teacher') {
    return <p>Access denied. Only teachers can view attendance records.</p>;
  }

  if (loading) return <p>Loading attendance records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record._id}>
            {record.studentId.name} - {record.status} on {new Date(record.date).toLocaleDateString()}
            <button onClick={() => handleUpdateAttendance(record._id, { status: 'Present' })}>
              Mark as Present
            </button>
            <button onClick={() => handleUpdateAttendance(record._id, { status: 'Absent' })}>
              Mark as Absent
            </button>
          </li>
        ))}
      </ul>

      <h3>Add Attendance</h3>
      <input
        type="text"
        placeholder="Student ID"
        onChange={(e) => setNewAttendance({ ...newAttendance, studentId: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
      />
      <select
        onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })}
        value={newAttendance.status}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>
      <button onClick={handlePostAttendance}>Add Attendance</button>
    </div>
  );
};

export default Attendance;
