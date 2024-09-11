import { useState } from "react";

const timeOptions = ["08:00", "09:00", "10:00", "11:00", "12:00"];

const ClassForm = ({ handleAddClass }) => {
  const [formData, setFormData] = useState({
    className: "",
    classCode: "",
    teacherId: "",
    students: "",
    schedule: [{ day: "", startTime: "", endTime: "" }],
  });

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
    await handleAddClass(formData);
    setFormData({
      className: "",
      classCode: "",
      teacherId: "",
      students: "",
      schedule: [{ day: "", startTime: "", endTime: "" }],
    });
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
        <label>Teacher ID:</label>
        <input
          type="text"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Students (comma separated):</label>
        <input
          type="text"
          name="students"
          value={formData.students}
          onChange={handleChange}
        />
      </div>
      {formData.schedule.map((item, index) => (
        <div key={index}>
          <label>Schedule {index + 1}:</label>
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
      <button type="submit">Add Class</button>
    </form>
  );
};

export default ClassForm;
