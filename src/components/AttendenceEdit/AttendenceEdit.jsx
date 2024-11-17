import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getAttendanceRecord, updateAttendance } from "../../services/attendanceService";

const AttendanceEdit = () => {
  const { classId, recordId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { studentName, currentStatus, date } = location.state || {};
  
  const [status, setStatus] = useState(currentStatus || ''); // Set initial status from passed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceRecord = async () => {
      try {
        const record = await getAttendanceRecord(classId, recordId);
        setStatus(record.status);
      } catch (error) {
        setError('Failed to fetch attendance record');
        console.error('Error fetching attendance record:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecord();
  }, [classId, recordId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAttendance(classId, recordId, { status });
      navigate(`/class/${classId}/view-attendance`);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!studentName) return <p>No student selected for editing.</p>;

  return (
    <div>
      <h2>Edit Attendance for {studentName}</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" value={date} readOnly />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button type="submit">Update Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceEdit;