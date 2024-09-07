/** @format */

// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>

				<li>
					<Link to="/student">Student List</Link>
				</li>
				<li>
					<Link to="/teacher">Teacher List</Link>
				</li>
				<li>
					<Link to="/course">Course List</Link>
				</li>
				<li>
					<Link to="/addStudent">Add Student</Link>
				</li>
				<li>
					<Link to="/addTeacher">Add Teacher</Link>
				</li>
				<li>
					<Link to="/addCourse">Add Course</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
