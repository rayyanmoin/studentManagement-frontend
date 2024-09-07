/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddCourse = () => {
	const [courseData, setCourseData] = useState({
		teacherId: 0,
		courseName: "",
		amount: "",
	});

      const [teachers, setTeachers] = useState([]);

        const fetchTeachers = async () => {
					try {
						const response = await axios.get("http://localhost:8080/studentmanagementapi/teacher/getDropList");
						setTeachers(response.data);
						console.log(response.data);
					} catch (error) {
						console.error("Error fetching Teachers:", error);
					}
				};

				function replaceTeacherWithId(name) {
					const foundObject = teachers.find((obj) => obj.teacherName === name);
					return foundObject?.id;
				}

				useEffect(() => {
					fetchTeachers();
				}, []);

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const notify = () => toast("Teacher Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Teacher!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	//const notifyPin = () => toast("The color provided should be having @gmail.com characters!", { type: "warning" });

	const AddCourse = async () => {
		console.log(courseData);
		if (hasEmptyValues(courseData)) {
			notifyWarning();
			return;
		} else {
			try {
				const response = await axios.post("http://localhost:8080/studentmanagementapi/course/add", courseData);
				setCourseData({
					teacherId: 0,
					courseName: "",
					amount: "",
				});
				notify();
			} catch (error) {
				notifyError();
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCourseData({
			...courseData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Course</h2>

				<div className="form-group">
					<label htmlFor="teacherId" class="required">
						Teacher Names
					</label>
					<select id="statusOption" name="teacherId" value={replaceTeacherWithId(courseData.teacherId)} onChange={handleInputChange}>
						<option key={null} value={null}></option>
						{teachers.map((g) => (
							<option key={g.teacherId} value={g.teacherId}>
								{g.teacherName}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="courseName" class="required">
						Course Name
					</label>
					<input type="text" id="courseName" name="courseName" value={courseData.courseName} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="amount" class="required">
						Amount
					</label>
					<input type="text" id="amount" name="amount" value={courseData.amount} onChange={handleInputChange} />
				</div>

				<button className="submitBtn" type="submit" onClick={AddCourse}>
					Create Course
				</button>
			</div>
		</div>
	);
};

export default AddCourse;
