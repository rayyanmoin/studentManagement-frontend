/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
 
  const [teacher, setTeacher] = useState([]);

	const fetchTeacher = async () => {
		try {
			const response = await axios.get("http://localhost:8080/studentmanagementapi/teacher/getList");
			setTeacher(response.data);
		} catch (error) {
			console.error("Error fetching Teacher:", error);
		}
	};

	useEffect(() => {
		fetchTeacher();
	}, []);

	const columnDefs = [
		{ headerName: "Teacher ID", field: "teacherId", width: 120 },
		{ headerName: "Teacher Name", field: "teacherName", width: 170 },
		{ headerName: "Phone Number", field: "phoneNumber", width: 150 },
		{ headerName: "Experience", field: "experience", width: 150 },
		{ headerName: "Qualification", field: "qualification", width: 210 },
		{ headerName: "Salary Amount", field: "salaryAmount", width: 140 },
		{ headerName: "Joined Date", field: "joinedDate", width: 250 },
		{ headerName: "Cnic", field: "cnic", width: 170 },
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1200px", margin: "0 auto" }}>
			{teacher.length > 0 ? (
				<>
					<h1>Total Teachers: {teacher.length}</h1>

					<AgGridReact columnDefs={columnDefs} rowData={teacher} pagination={true} paginationPageSize={10} />
				</>
			) : (
				<Loading />
			)}
		</div>
	);

 
};

export default Teacher;
