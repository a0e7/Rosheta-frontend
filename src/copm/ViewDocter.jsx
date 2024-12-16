// src/admin/ViewDocter.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios"; // Import Axios
import styles from "./ViweDocter.module.css";
import Navbar from "./Navbar"; // Adjust the path if necessary
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaStethoscope,
  FaPhone,
  FaFileAlt,
} from "react-icons/fa";

const ViewDocter = () => {
  const { id } = useParams(); // Get the doctor ID from URL parameters
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api.rosheta.info/admin/get-Doctor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token with request
            },
          }
        ); // Use the ID in the API call
        setDoctorData(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [id]); // Dependency array includes id

  if (!doctorData) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.doctorContainer}>
        <h1>Doctor Details</h1>
        <div className={styles.detailsContainer}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <span>
              {doctorData.firstName} {doctorData.middleName}{" "}
              {doctorData.lastName}
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <FaPhone className={styles.icon} />
            <span>{doctorData.PhoneNumber}</span>
          </div>
          <div className={styles.inputWrapper}>
            <FaFileAlt className={styles.icon} />
            <span>{doctorData.dateOfBirth}</span>
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <span>{doctorData.residenceCity}</span>
          </div>
          <div className={styles.inputWrapper}>
            <FaGraduationCap className={styles.icon} />
            <span>{doctorData.proficiency}</span>
          </div>
          <div className={styles.inputWrapper}>
            <FaBriefcase className={styles.icon} />
            <span>{doctorData.workPlace}</span>
          </div>
          <div className={styles.inputWrapper}>
            <FaStethoscope className={styles.icon} />
            <span>{doctorData.briefHistory}</span>
          </div>
          {/* Render Education Details */}
          {doctorData.education && doctorData.education.length > 0 ? (
            doctorData.education.map(
              (edu, index) =>
                // Check if edu is not null or undefined before accessing its properties
                edu ? (
                  <div key={index} className={styles.educationRow}>
                    <div className={styles.inputWrapper}>
                      <FaGraduationCap className={styles.icon} />
                      <span>{edu.university}</span>
                      <span>{edu.graduationYear}</span>
                      <span>{edu.graduationCity}</span>
                      <span>{edu.degree}</span>
                      <span>{edu.proficiency}</span>
                    </div>
                  </div>
                ) : null // If edu is null or undefined, skip rendering this row
            )
          ) : (
            <p>No education data available.</p>
          )}

          {/* Photo Display */}
          <div className={styles.photoWrapper}>
            {doctorData.photo ? (
              <img
                src={"https://api.rosheta.info/" + doctorData.photo}
                alt="Doctor"
                className={styles.doctorPhoto}
              />
            ) : (
              <span>No photo uploaded</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocter;
