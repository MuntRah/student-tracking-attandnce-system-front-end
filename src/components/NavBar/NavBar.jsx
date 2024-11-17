import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import "./NavBar.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>Welcome, {user.username}</li>

            {user.role === "admin" && (
              <>
                <li>
                  <Link className="dashboard" to="/admin/users">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="newClass" to="/admin/class/new">
                    New Class
                  </Link>
                </li>
                <li>
                  <Link className="manageTeachers" to="/admin/users/teacher">
                    Manage Teachers
                  </Link>
                </li>
                <li>
                  <Link className="manageTeachers" to="/admin/users/student">
                    Manage Students
                  </Link>
                </li>
                <li>
                  <Link className="manageTeachers" to="/admin/class">
                    List class
                  </Link>
                </li>
              </>
            )}

            {user.role === "teacher" && (
              <>
                <li>
                  <Link className="dashboard" to="/class">
                    My Classes
                  </Link>
                </li>
                <li>
                  <Link className="attendance" to="/teacher/attendance">
                    Mark Attendance
                  </Link>
                </li>
              </>
            )}

            {user.role === "student" && (
              <>
                <li>
                  <Link className="dashboard" to="/class">
                    My Classes
                  </Link>
                </li>
                <li>
                  <Link className="schedule" to="/student/schedule">
                    View Schedule
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link className="signout" to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link className="signin" to="/signin">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="signup" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
