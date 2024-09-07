/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import { Home } from "./Components/Home.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Teacher from "./Components/Teacher.js";
import Course from "./Components/Course.js";
import Student from "./Components/Student.js";
import AddTeachers from "./Components/AddTeacher.js";
import AddCourse from "./Components/AddCourse.js";


const AppRouter = () => {
	return (
		<Router>
			<Navbar />
			<ToastContainer
				toastStyle={{
					fontFamily: "Arial",
				}}
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/teacher" element={<Teacher />} />
				<Route path="/course" element={<Course />} />
				<Route path="/student" element={<Student />} />
				<Route path="/addTeacher" element={<AddTeachers />} />
				<Route path="/addCourse" element={<AddCourse />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
