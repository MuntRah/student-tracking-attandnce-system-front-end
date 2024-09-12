import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { newClass } from "../../services/classService";
import "./ClassForm.css";

const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/admin/users`;

const timeOptions = ["08:00", "09:00", "10:00", "11:00", "12:00"];

const ClassForm = ({ handleAddClass }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    className: "",
    classCode: "",
    teacherId: "",
    students: [],
    schedule: [{ day: "", startTime: "", endTime: "" }],
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentsAndTeachers = async () => {
      try {
        const [studentsResponse, teachersResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/student`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${BACKEND_URL}/teacher`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        setStudents(studentsResponse.data);
        setTeachers(teachersResponse.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching students and teachers:", err);
      }
    };

    fetchStudentsAndTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = formData.schedule.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({
      ...formData,
      schedule: updatedSchedule,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newClass(formData);

      navigate("/class");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Class Name:</label>
        <input
          type="text"
          name="className"
          value={formData.className}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Class Code:</label>
        <input
          type="text"
          name="classCode"
          value={formData.classCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Teacher:</label>
        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.username} - {teacher.email}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Students:</label>
        <select
          name="students"
          value={formData.students}
          onChange={(e) =>
            setFormData({
              ...formData,
              students: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
          multiple
          required
        >
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.username} - {student.email}
            </option>
          ))}
        </select>
      </div>
      {formData.schedule.map((item, index) => (
        <div key={index}>
          <label>Schedule :</label>
          <select
            value={item.day}
            onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <select
            value={item.startTime}
            onChange={(e) =>
              handleScheduleChange(index, "startTime", e.target.value)
            }
            required
          >
            <option value="">Select Start Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            value={item.endTime}
            onChange={(e) =>
              handleScheduleChange(index, "endTime", e.target.value)
            }
            required
          >
            <option value="">Select End Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button className="addCls" type="submit">
        Add Class
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default ClassForm;
