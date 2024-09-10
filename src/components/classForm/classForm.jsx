import { useState, useEffect } from "react";

const timeOptions = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const ClassForm = ({
  handleAddClass,
  handleUpdateClass,
  handleDeleteClass,
  teachers = [],
}) => {
  const [formData, setFormData] = useState({
    className: "",
    classCode: "",
    teacherId: "",
    students: "",
    schedule: [{ day: "", startTime: "", endTime: "" }],
  });
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    if (selectedClassId) {
    }
  }, [selectedClassId]);

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

  const handleAddSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", startTime: "", endTime: "" }],
    });
  };

  const handleDeleteSchedule = (index) => {
    const updatedSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      schedule: updatedSchedule,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedClassId) {
      await handleUpdateClass(selectedClassId, formData);
    } else {
      await handleAddClass(formData);
    }
    setFormData({
      className: "",
      classCode: "",
      teacherId: "",
      students: "",
      schedule: [{ day: "", startTime: "", endTime: "" }],
    });
    setSelectedClassId(null);
  };

  const handleDelete = async () => {
    if (selectedClassId) {
      await handleDeleteClass(selectedClassId);
      setFormData({
        className: "",
        classCode: "",
        teacherId: "",
        students: "",
        schedule: [{ day: "", startTime: "", endTime: "" }],
      });
      setSelectedClassId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="className">Class Name:</label>
        <input
          type="text"
          id="className"
          name="className"
          value={formData.className}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="classCode">Class Code:</label>
        <input
          type="text"
          id="classCode"
          name="classCode"
          value={formData.classCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="teacherId">Teacher ID:</label>
        <input
          type="text"
          id="teacherId"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="students">Students (comma separated):</label>
        <input
          type="text"
          id="students"
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
          <button type="button" onClick={() => handleDeleteSchedule(index)}>
            Delete Schedule
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSchedule}>
        Add Another Schedule
      </button>
      <button type="submit">
        {selectedClassId ? "Update Class" : "Add Class"}
      </button>
      {selectedClassId && (
        <button type="button" onClick={handleDelete}>
          Delete Class
        </button>
      )}
    </form>
  );
};

export default ClassForm;
