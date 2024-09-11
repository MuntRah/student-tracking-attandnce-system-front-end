const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/attendance`;

const getAttendanceById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to fetch attendance record");
    }

    return json;
  } catch (err) {
    console.error("Error fetching attendance record:", err);
    throw err;
  }
};

const postAttendance = async (attendanceData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/new`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(attendanceData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to create attendance record");
    }

    return json;
  } catch (err) {
    console.error("Error creating attendance record:", err);
    throw err;
  }
};

const updateAttendance = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to update attendance record");
    }

    return json;
  } catch (err) {
    console.error("Error updating attendance record:", err);
    throw err;
  }
};

export { getAttendanceById, postAttendance, updateAttendance };
