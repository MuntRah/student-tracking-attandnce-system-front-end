import { useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import ClassForm from "./components/classForm/classForm";
import * as authService from "../src/services/authService";
import * as classService from "../src/services/classService";
import ClassList from "./components/classList/classList";
import ClassDetail from "./components/classDetails/classDetails";
import * as attendenceService from "./services/attendenceService";
import Attendance from "./components/attendence/attendence";
import ClassListAdmin from "./components/classListAdmin/classListAdmin";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [classes, setClass] = useState([]);
  const navigate = useNavigate();

  const handleAddClass = async (classFormData) => {
    try {
      const newClass = await classService.newClass(classFormData);
      setClass([...classes, newClass]);
      navigate("/new");
    } catch (err) {
      console.error("Error adding class:", err);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await classService.deleteClass(classId);
      const updatedClasses = await classService.index();
      setClass(updatedClasses);
      navigate("/classId");
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  const handleUpdateClass = async (classId, formData) => {
    try {
      const updatedClass = await classService.updateClass(classId, formData);
      setClass(
        classes.map((cls) => (classId === cls._id ? updatedClass : cls))
      );
      navigate("/classId");
    } catch (err) {
      console.error("Error updating class:", err);
    }
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/class/:classId" element={<ClassDetail />} />{" "}
            <Route path="/attendance/new" element={<Attendance />} />
            <Route path="/class" element={<ClassList />} />
            <Route path="/admin/class" element={<ClassListAdmin />} />
            {user.role === "admin" && (
              <Route
                path="class/new"
                element={
                  <ClassForm
                    handleAddClass={handleAddClass}
                    handleDeleteClass={handleDeleteClass}
                    handleUpdateClass={handleUpdateClass}
                  />
                }
              />
            )}
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
