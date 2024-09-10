const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const index = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/admin/users/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data.students;
  } catch (err) {
    console.log(err);
  }
};

export default { index };
