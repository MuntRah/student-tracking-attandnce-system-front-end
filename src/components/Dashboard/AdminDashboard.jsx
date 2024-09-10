import { AuthedUserContext } from "../../App";
import { useContext } from "react";
const AdminDashboard = ({ props }) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>{}</p>
    </main>
  );
};

export default AdminDashboard;
