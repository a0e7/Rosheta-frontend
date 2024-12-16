import React, { useState, useEffect } from "react";
import styles from "./PharmacyProfile.module.css"; // Import your CSS module
import PharmacistNavbar from "./PharmacistNavbar"; // Import the Navbar component
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaPhone,
  FaUser,
  FaIdBadge,
  FaStore, // Icon for pharmacy name
} from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import axios from "axios";

const PharmacyProfile = () => {
  const { id } = useParams(); // Get the pharmacy ID from the URL
  const [pharmacyData, setPharmacyData] = useState(null); // State to store pharmacy data
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

  useEffect(() => {
    const fetchPharmacyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/pharmacy/profile-Data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPharmacyData(response.data.pharmacy); // Set the fetched data
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
      }
    };

    fetchPharmacyData();
  }, [id, token]); // Dependency array includes id and token

  if (!pharmacyData) {
    return <div></div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.pageContainer}>
      <PharmacistNavbar />
      <div className={styles.profileContainer}>
        <h1>
          <FaStore style={{ marginRight: "10px", color: "#4a90e2" }} />
          {pharmacyData.pharmacyName}
        </h1>
        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <FaBuilding className={styles.icon} />
            <span>
              <strong>Location:</strong> {pharmacyData.pharmacyLocation}
            </span>
          </div>
          <div className={styles.infoSection}>
            <FaPhone className={styles.icon} />
            <span>
              <strong>Phone:</strong> {pharmacyData.phoneNumber}
            </span>
          </div>
          <div className={styles.infoSection}>
            <FaUser className={styles.icon} />
            <span>
              <strong>Employee:</strong> {pharmacyData.pharmacyEmployee}
            </span>
          </div>
          <div className={styles.infoSection}>
            <FaIdBadge className={styles.icon} />
            <span>
              <strong>Employee Number:</strong>{" "}
              {pharmacyData.pharmacyEmployeeNumber}
            </span>
          </div>
        </div>
        <Link to="/resetpassword">
          <button className={styles.resetButton}>Reset Password</button>
        </Link>
      </div>
    </div>
  );
};

export default PharmacyProfile;
