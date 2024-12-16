// src/admin/ViewPharmacies.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./ViewPharmacies.module.css"; // Import your CSS module
import Navbar from "./Navbar";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaIdBadge,
} from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom"; // Import useParams to get the pharmacy ID

const ViewPharmacies = () => {
  const { id } = useParams(); // Get the pharmacy ID from the URL
  const [pharmacyData, setPharmacyData] = useState([]); // State to store pharmacy data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch pharmacy data when the component mounts
    const fetchPharmacyData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:8090/admin/get-Pharmacy/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send token with request
              },
            }
          ); // Adjust the API endpoint
          setPharmacyData(response.data.pharamacy); // Set the fetched data
        } catch (error) {
          setError("Error fetching pharmacy data"); // Set error message
        } finally {
          setLoading(false); // Set loading to false
        }
      }
    };

    fetchPharmacyData();
  }, [id]); // Fetch data when the ID changes

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.pharmacyContainer}>
        <h1>View Pharmacy</h1>
        <div className={styles.inputWrapper}>
          <FaBuilding className={styles.icon} />
          <span className={styles.staticText}>{pharmacyData.pharmacyName}</span>
        </div>

        <div className={styles.inputWrapper}>
          <FaMapMarkerAlt className={styles.icon} />

          <span className={styles.staticText}>
            {pharmacyData.pharmacyLocation}
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <FaPhone className={styles.icon} />
          <span className={styles.staticText}>{pharmacyData.phoneNumber}</span>
        </div>
        <div className={styles.inputWrapper}>
          <FaUser className={styles.icon} />
          <span className={styles.staticText}>
            {pharmacyData.pharmacyEmployee}
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <FaIdBadge className={styles.icon} />
          <span className={styles.staticText}>
            {pharmacyData.pharmacyEmployeeNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewPharmacies;
