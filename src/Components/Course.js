/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Course = () => {
	const [course, setCourse] = useState([]);

	const fetchCourse = async () => {
		try {
			const response = await axios.get("http://localhost:8080/studentmanagementapi/course/getList");
			setCourse(response.data);
		} catch (error) {
			console.error("Error fetching Course:", error);
		}
	};

	useEffect(() => {
		fetchCourse();
	}, []);


	const columnDefs = [
		{ headerName: "Course ID", field: "courseId", width: 200 },
		{ headerName: "Teacher Name", field: "teacherName", width: 200 },
		{ headerName: "Cnic", field: "cnic", width: 230 },
		{ headerName: "Course Name", field: "courseName", width: 350 },
		{ headerName: "Amount", field: "amount", width: 190 },
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1200px", margin: "0 auto" }}>
			{course.length > 0 ? (
				<>
					<h1>Total Courses: {course.length}</h1>

					<AgGridReact columnDefs={columnDefs} rowData={course} pagination={true} paginationPageSize={10} />
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Course;
