import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

// CourseCellRenderer component to display the list of courses in a cell
const CourseCellRenderer = (props) => {
	const { courses } = props.data;

	// Debugging log
	console.log("Courses:", courses);

	// Join course names into a single string separated by commas
	const courseNames = Array.isArray(courses) ? courses.map((course) => course.courseName).join(", ") : "No courses available";

	return <span>{courseNames}</span>;
};

const Student = () => {
	const [student, setStudent] = useState([]);

	const fetchStudent = async () => {
		try {
			const response = await axios.get("http://localhost:8080/studentmanagementapi/student/getList");
			setStudent(response.data);
		} catch (error) {
			console.error("Error fetching Student:", error);
		}
	};

	useEffect(() => {
		fetchStudent();
	}, []);

	const columnDefs = [
		{ headerName: "Student ID", field: "studentId", width: 120 },
		{ headerName: "Student Name", field: "studentName", width: 200 },
		{ headerName: "Email", field: "email", width: 250 },
		{ headerName: "Phone Number", field: "phoneNumber", width: 170 },
		{ headerName: "Address", field: "address", width: 260 },
		{
			headerName: "Courses",
			field: "courses",
			width: 300,
			cellRenderer: CourseCellRenderer, // Custom cell renderer for courses
		},
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1200px", margin: "0 auto" }}>
			{student.length > 0 ? (
				<>
					<h1>Total Students: {student.length}</h1>

					<AgGridReact columnDefs={columnDefs} rowData={student} pagination={true} paginationPageSize={10} />
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Student;
