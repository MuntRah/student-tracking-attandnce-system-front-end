import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "./Signup.css";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "Student",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf, firstName, lastName, email, role } =
    formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1 className="title">Sign Up</h1>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              className="animated-input"
            />
          </div>
          <div className="input-group-row">
            <div className="input-group half">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                className="animated-input"
              />
            </div>
            <div className="input-group half">
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                className="animated-input"
              />
            </div>
          </div>
          <div className="input-group-row">
            <div className="input-group half">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                className="animated-input"
              />
            </div>
            <div className="input-group half">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                className="animated-input"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              className="animated-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              className="animated-input"
            >
              <option value="Admin">Admin</option>
              <option value="student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <div className="button-container ">
            <button
              className="animated-button bg-black"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
          </div>
          <div className="form-footer">
            <p>Already have an account?</p>
            <Link className="signin-link" to="/signin">
              Sign In
            </Link>
          </div>
          <p className="error-message">{message}</p>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
