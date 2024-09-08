const BACKEND_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/class`;


const newClass = async (classData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to create class");
    }

    return json;
  } catch (err) {
    console.error("Error creating class:", err);
    throw err;
  }
};


const updateClass = async (classId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/${classId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to update class");
    }

    return json;
  } catch (err) {
    console.error("Error updating class:", err);
    throw err;
  }
};


const deleteClass = async (classId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BACKEND_URL}/${classId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to delete class");
    }

    return json;
  } catch (err) {
    console.error("Error deleting class:", err);
    throw err;
  }
};

export { newClass, updateClass, deleteClass };
