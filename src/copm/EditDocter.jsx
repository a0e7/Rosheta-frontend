// src/admin/EditDocter.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./EditDocter.module.css";
import Navbar from "./Navbar";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaStethoscope,
  FaPhone,
  FaPlusCircle,
} from "react-icons/fa";

const EditDocter = () => {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    PhoneNumber: "",
    dateOfBirth: "",
    residenceCity: "",
    proficiency: "",
    briefHistory: "",
    workPlace: "",
    education: [],
    email: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8090/admin/get-Doctor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctorData({
          ...response.data.doctor,
          dateOfBirth: new Date(response.data.doctor.dateOfBirth)
            .toISOString()
            .split("T")[0],
          image: response.data.doctor.image,
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        alert("Failed to fetch doctor data.");
      }
    };

    fetchDoctorData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /education\.(\d+)\.(.+)/;

    const match = name.match(regex);
    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      setDoctorData((prevState) => {
        const updatedEducation = [...prevState.education];
        updatedEducation[index] = {
          ...updatedEducation[index],
          [field]: value,
        };
        return { ...prevState, education: updatedEducation };
      });
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
      image: file,
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

    formData.append("PhoneNumber", doctorData.PhoneNumber);
    formData.append("firstName", doctorData.firstName);
    formData.append("middleName", doctorData.middleName);
    formData.append("lastName", doctorData.lastName);
    formData.append("dateOfBirth", doctorData.dateOfBirth);
    formData.append("residenceCity", doctorData.residenceCity);
    formData.append("proficiency", doctorData.proficiency);
    formData.append("briefHistory", doctorData.briefHistory);
    formData.append("workPlace", doctorData.workPlace);

    doctorData.education.forEach((edu, index) => {
      Object.keys(edu).forEach((key) => {
        formData.append(`education[${index}][${key}]`, edu[key]);
      });
    });

    if (doctorData.image instanceof File) {
      formData.append("image", doctorData.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8090/admin/edit-Doctor/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Doctor Data Updated:", response.data);
      setShowModal(true); // Show modal on success
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.doctorContainer}>
        <h1>Edit Doctor</h1>
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
              type="text"
              name="PhoneNumber"
              placeholder="Phone Number"
              value={doctorData.PhoneNumber}
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
              placeholder="Residency City"
              value={doctorData.residenceCity}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaGraduationCap className={styles.icon} />
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

          {/* Education Section */}
          {doctorData.education.map((edu, index) => (
            <div className={styles.educationRow} key={index}>
              <div className={styles.inputWrapper}>
                <FaGraduationCap className={styles.icon} />
                <input
                  type="text"
                  name={`education${index}.university`}
                  placeholder="University"
                  value={edu.university}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education${index}.graduationYear`}
                  placeholder="Graduation Year"
                  value={edu.graduationYear}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education${index}.graduationCity`}
                  placeholder="Graduation City"
                  value={edu.graduationCity}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education${index}.degree`}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name={`education${index}.proficiency`}
                  placeholder="Proficiency"
                  value={edu.proficiency}
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
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.createButton}>
            <FaPlusCircle className={styles.buttonIcon} /> Update Doctor
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Doctor updated successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDocter;