/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const AddStudent = () => {
	const [studentData, setStudentData] = useState({
		studentName: "",
		email: "",
		phoneNumber: "",
		address: "",
		courses: [{ courseId: "", enrollmentDate: "" }],
	});

	const [availableCourses, setAvailableCourses] = useState([]); // Renamed from `course` to `availableCourses`

	// Fetch courses from the API
	const fetchCourses = async () => {
		try {
			const response = await axios.get("http://localhost:8080/studentmanagementapi/course/getOnlyCourseList");
			setAvailableCourses(response.data); // Store the fetched courses
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching Course:", error);
		}
	};

	// Function to replace course name with course ID
	function replaceCourseWithId(name) {
		const foundObject = availableCourses.find((obj) => obj.CourseName === name);
		return foundObject?.id;
	}

	useEffect(() => {
		fetchCourses();
	}, []);

	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const hasValidCourses = () => {
		return studentData.courses.every((course) => course.courseId !== "");
	};

	const notify = () => toast("Student Created Successfully!", { type: "success" });
	const notifyError = () => toast("Error While Adding Student!", { type: "error" });
	const notifyWarning = (message) => toast(message, { type: "warning" });

	const Student = async () => {
		console.log(studentData);
		if (hasEmptyValues(studentData)) {
			notifyWarning("Please fill all student details!");
			return;
		}
		if (!hasValidCourses()) {
			notifyWarning("Please select at least one valid course!");
			return;
		}
		try {
			await axios.post("http://localhost:8080/studentmanagementapi/student/add", studentData);
			setStudentData({
				studentName: "",
				email: "",
				phoneNumber: "",
				address: "",
				courses: [{ courseId: "", enrollmentDate: "" }],
			});
			notify();
		} catch (error) {
			notifyError();
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setStudentData({
			...studentData,
			[name]: value,
		});
	};

	const handleCourseChange = (index, e) => {
		const { name, value } = e.target;
		const updatedCourses = [...studentData.courses];
		updatedCourses[index][name] = value;
		setStudentData({
			...studentData,
			courses: updatedCourses,
		});
	};

	const addCourse = () => {
		setStudentData({
			...studentData,
			courses: [...studentData.courses, { courseId: "", enrollmentDate: "" }],
		});
	};

	const removeCourse = (index) => {
		const updatedCourses = [...studentData.courses];
		updatedCourses.splice(index, 1);
		setStudentData({
			...studentData,
			courses: updatedCourses,
		});
	};

	return (
		<div>
			<div className="card">
				<h2>Create Student</h2>
				<div className="form-group">
					<label htmlFor="studentName" className="required">
						Student Name
					</label>
					<input type="text" id="studentName" name="studentName" value={studentData.studentName} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="email" className="required">
						Email
					</label>
					<input type="text" id="email" name="email" value={studentData.email} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="phoneNumber" className="required">
						Phone Number
					</label>
					<input type="text" id="phoneNumber" name="phoneNumber" value={studentData.phoneNumber} onChange={handleInputChange} />
				</div>
				<div className="form-group">
					<label htmlFor="address" className="required">
						Address
					</label>
					<input type="text" id="address" name="address" value={studentData.address} onChange={handleInputChange} />
				</div>

				<div>
					<h3>Courses</h3>
					{studentData.courses.map((course, index) => (
						<div key={index} className="form-group course-group">
							<label className="requiredss">Course ID *</label>
							<select name="courseId" value={course.courseId} onChange={(e) => handleCourseChange(index, e)} required>
								<option value="">Select a course</option>
								{availableCourses.map((c) => (
									<option key={c.courseId} value={c.courseId}>
										{c.courseName}
									</option>
								))}
							</select>

							<label className="requiredss">Enrollment Date *</label>
							<input type="date" name="enrollmentDate" value={course.enrollmentDate} onChange={(e) => handleCourseChange(index, e)} required />

							{/* Delete button for each course */}
							<button type="button" className="removeCourseBtn" onClick={() => removeCourse(index)}></button>
						</div>
					))}
					<button type="button" className="addCourseBtn" onClick={addCourse}></button>
				</div>

				<button className="submitBtn" type="submit" onClick={Student}>
					Create Student
				</button>
			</div>
		</div>
	);
};

export default AddStudent;
