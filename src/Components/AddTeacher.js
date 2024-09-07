/** @format */

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const AddTeachers = () => {
	const [teacherData, setTeacherData] = useState({
		teacherName: "",
		phoneNumber: "",
		experience: "",
		qualification: "",
		salaryAmount: "",
		joinedDate: "",
		cnic: "",
	});

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	function isValidCnic(cnic) {
		// Check if CNIC is exactly 13 digits long
		const cnicRegex = /^\d{13}$/;
		return cnicRegex.test(cnic);
	}

	const notify = () => toast("Teacher Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Teacher!", { type: "error" });
	const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
	const notifyCnicWarning = () => toast("CNIC must be exactly 13 digits long!", { type: "warning" });

	const addTeacher = async () => {
		console.log(teacherData);
		if (hasEmptyValues(teacherData)) {
			notifyWarning();
			return;
		}
		if (!isValidCnic(teacherData.cnic)) {
			notifyCnicWarning();
			return;
		}
		try {
			const response = await axios.post("http://localhost:8080/studentmanagementapi/teacher/add", teacherData);
			setTeacherData({
				teacherName: "",
				phoneNumber: "",
				experience: "",
				qualification: "",
				salaryAmount: "",
				joinedDate: "",
				cnic: "",
			});
			notify();
		} catch (error) {
			notifyError();
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTeacherData({
			...teacherData,
			[name]: value,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Teacher</h2>
				<div className="form-group">
					<label htmlFor="teacherName" className="required">
						Teacher Name
					</label>
					<input type="text" id="teacherName" name="teacherName" value={teacherData.teacherName} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="phoneNumber" className="required">
						Phone Number
					</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value={teacherData.phoneNumber} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="experience" className="required">
						Experience
					</label>
					<input type="text" id="experience" name="experience" value={teacherData.experience} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="qualification" className="required">
						Qualification
					</label>
					<input type="text" id="qualification" name="qualification" value={teacherData.qualification} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="salaryAmount" className="required">
						Salary Amount
					</label>
					<input type="text" id="salaryAmount" name="salaryAmount" value={teacherData.salaryAmount} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="joinedDate" className="required">
						Joined Date
					</label>
					<input type="Date" id="joinedDate" name="joinedDate" value={teacherData.joinedDate} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="cnic" className="required">
						CNIC
					</label>
					<input type="text" id="cnic" name="cnic" value={teacherData.cnic} onChange={handleInputChange} />
				</div>
				<button className="submitBtn" type="submit" onClick={addTeacher}>
					Create Teacher
				</button>
			</div>
		</div>
	);
};

export default AddTeachers;
