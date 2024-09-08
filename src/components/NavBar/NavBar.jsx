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
            <li>
              <Link className="dashboard" to="/">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="newClass" to="class/new">
                newClass
              </Link>
            </li>
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
