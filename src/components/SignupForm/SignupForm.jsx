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
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="first">First Name</label>
          <input
            type="text"
            id="first"
            value={firstName}
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last">Last Name</label>
          <input
            type="text"
            id="last"
            value={lastName}
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="student">student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
