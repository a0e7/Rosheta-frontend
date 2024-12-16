import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./DocterProfile.module.css"; // Import your CSS module
import NavbarD from "./NavberD";
import {
  FaPhone,
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
} from "react-icons/fa";
import axios from "axios";

const DocterProfile = () => {
  const { id } = useParams(); // Get the doctor ID from the URL
  const [doctorData, setDoctorData] = useState(null);
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `https://api.rosheta.info/doctor/profile-Data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const doctor = response.data.doctor;
        setDoctorData({
          name: `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`,
          qualification: doctor.education
            .map((edu) => edu.proficiency)
            .join(", "),
          experience: doctor.briefHistory,
          specialization: doctor.proficiency,
          contact: doctor.PhoneNumber || "N/A", // Ensure the contact field exists
          image: doctor.photo, // You can add logic to fetch the image if available
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [id, token]); // Dependency array includes id and token

  if (!doctorData) {
    return <div></div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.pageContainer}>
      <NavbarD />
      <div className={styles.profileContainer}>
        <h1>
          <FaUser style={{ marginRight: "10px", color: "#4a90e2" }} />
          Doctor Profile
        </h1>
        <div className={styles.imageContainer}>
          {doctorData.image ? (
            <img
              src={"https://api.rosheta.info/" + doctorData.image}
              alt="Doctor"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.placeholderImage}>
              <FaUser size={150} color="#4a90e2" />
            </div>
          )}
          <h2 className={styles.doctorName}>{doctorData.name}</h2>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <h2>Personal Information</h2>
            <p>
              <FaUser style={{ marginRight: "5px" }} /> <strong>Name:</strong>{" "}
              {doctorData.name}
            </p>
            <p>
              <FaGraduationCap style={{ marginRight: "5px" }} />{" "}
              <strong>Qualification:</strong> {doctorData.qualification}
            </p>
            <p>
              <FaBriefcase style={{ marginRight: "5px" }} />{" "}
              <strong>Experience:</strong> {doctorData.experience}
            </p>
            <p>
              <FaHeart style={{ marginRight: "5px" }} />{" "}
              <strong>Specialization:</strong> {doctorData.specialization}
            </p>
          </div>
          <div className={styles.contactSection}>
            <h2>Contact Information</h2>
            <p>
              <FaPhone style={{ marginRight: "5px" }} />{" "}
              <strong>Contact:</strong> {doctorData.contact}
            </p>
          </div>
        </div>
        <Link to="/resetpassword">
          <button className={styles.resetButton}>Reset Password</button>
        </Link>
      </div>
    </div>
  );
};

export default DocterProfile;
