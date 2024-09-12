import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import "./Dashboard.css"; 

const AdminDashboard = () => {
  const user = useContext(AuthedUserContext);

  return (
    <main className="dashboard-container">
      <div className="welcome-card">
        <div className="welcome-text">
          <h1>Welcome, {user.username}!</h1>
          <p>This is the admin dashboard where you can manage everything.</p>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
