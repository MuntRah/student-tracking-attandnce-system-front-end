import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "./Signin.css";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className="signin-container">
      <div className="signin-card">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="signin-form"
        >
          <h1 className="title">Log In</h1>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className="animated-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="animated-input"
            />
          </div>
          <div className="button-container">
            <button type="signin" className="animated-button bg-black">
              Log In
            </button>
          </div>
          <div className="form-footer">
            <p>Don't have an account?</p>
            <Link className="signup-link" to="/signup">
              Sign Up
            </Link>
          </div>
          <p className="error-message">{message}</p>
        </form>
      </div>
    </main>
  );
};

export default SigninForm;
