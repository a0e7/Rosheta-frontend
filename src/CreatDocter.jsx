// src/admin/CreatDocter.js
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./CreatDocter.module.css";
import Navbar from "./copm/Navbar"; // Adjust the path if necessary
import {
  FaUser,
  FaGraduationCap,
  FaLock,
  FaUpload,
  FaBriefcase,
  FaStethoscope,
  FaPhone,
  FaPlusCircle,
} from "react-icons/fa";

const CreatDocter = () => {
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    residenceCity: "",
    proficiency: "",
    briefHistory: "",
    workPlace: "",
    education: [
      {
        university: "",
        graduationYear: "",
        graduationCity: "",
        degree: "",
        proficiency: "",
      },
    ],
    password: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("education[")) {
      const match = name.match(/education\[(\d+)\]\.(\w+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const key = match[2];
        setDoctorData((prevState) => {
          const updatedEducation = [...prevState.education];
          updatedEducation[index] = {
            ...updatedEducation[index],
            [key]: value,
          };
          return { ...prevState, education: updatedEducation };
        });
      }
    } else {
      setDoctorData({
        ...doctorData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDoctorData((prevData) => ({
      ...prevData,
      image: file, // Update the image field with the selected file
    }));
  };

  const handleAddEducation = () => {
    setDoctorData((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          university: "",
          graduationYear: "",
          graduationCity: "",
          degree: "",
          proficiency: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append fields to formData
    formData.append("phoneNumber", doctorData.phoneNumber);
    formData.append("password", doctorData.password);
    formData.append("firstName", doctorData.firstName);
    formData.append("middleName", doctorData.middleName);
    formData.append("lastName", doctorData.lastName);
    formData.append("dateOfBirth", doctorData.dateOfBirth);
    formData.append("residenceCity", doctorData.residenceCity);
    formData.append("proficiency", doctorData.proficiency);
    formData.append("briefHistory", doctorData.briefHistory);
    formData.append("workPlace", doctorData.workPlace);

    // Append education array
    doctorData.education.forEach((edu, index) => {
      Object.keys(edu).forEach((key) => {
        formData.append(`education[${index}][${key}]`, edu[key]);
      });
    });

    formData.append("image", doctorData.image);

    try {
      const response = await axios.post(
        "http://localhost:8090/admin/add-Doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Doctor Data Submitted:", response.data);
      setShowModal(true); // Show modal on success
      // Optionally reset the form
      setDoctorData({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        residenceCity: "",
        proficiency: "",
        briefHistory: "",
        workPlace: "",
        education: [
          {
            university: "",
            graduationYear: "",
            graduationCity: "",
            degree: "",
            proficiency: "",
          },
        ],
        password: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating doctor:", error);
      alert("Failed to create doctor. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.doctorContainer}>
        <h1>Create Doctor</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={doctorData.firstName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={doctorData.middleName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={doctorData.lastName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaPhone className={styles.icon} />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={doctorData.phoneNumber}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="date"
              name="dateOfBirth"
              value={doctorData.dateOfBirth}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="residenceCity"
              placeholder="Residence City"
              value={doctorData.residenceCity}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaStethoscope className={styles.icon} />
            <input
              type="text"
              name="proficiency"
              placeholder="Proficiency"
              value={doctorData.proficiency}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaBriefcase className={styles.icon} />
            <input
              type="text"
              name="workPlace"
              placeholder="Work Place"
              value={doctorData.workPlace}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaStethoscope className={styles.icon} />
            <input
              type="text"
              name="briefHistory"
              placeholder="Brief History"
              value={doctorData.briefHistory}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>

          {/* Education Inputs */}
          {doctorData.education.map((edu, index) => (
            <div className={styles.educationRow} key={index}>
              <div className={styles.inputWrapper}>
                <FaGraduationCap className={styles.icon} />
                <input
                  type="text"
                  name={`education[${index}].university`}
                  placeholder="University"
                  value={edu.university || ""}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  name={`education[${index}].graduationYear`}
                  placeholder="Graduation Year"
                  value={edu.graduationYear || ""}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education[${index}].graduationCity`}
                  placeholder="Graduation City"
                  value={edu.graduationCity || ""}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education[${index}].degree`}
                  placeholder="Degree"
                  value={edu.degree || ""}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education[${index}].proficiency`}
                  placeholder="Proficiency"
                  value={edu.proficiency || ""}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className={styles.addEducationButton}
          >
            Add Education
          </button>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={doctorData.password}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUpload className={styles.icon} />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.createButton}>
            <FaPlusCircle className={styles.buttonIcon} /> Create Doctor
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Doctor created successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatDocter;