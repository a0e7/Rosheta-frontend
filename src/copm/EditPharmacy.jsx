// src/admin/EditPharmacy.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./EditPharmacy.module.css"; // Import your CSS module
import Navbar from "./Navbar";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaIdBadge,
} from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom"; // Import useParams to get the pharmacy ID

const EditPharmacy = () => {
  const { id } = useParams(); // Get the pharmacy ID from the URL
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: "",
    pharmacyLocation: "",
    phoneNumber: "",
    pharmacyEmployee: "",
    pharmacyEmployeeNumber: "",
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetch existing pharmacy data when the component mounts
    const fetchPharmacyData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      try {
        const response = await axios.get(
          `https://api.rosheta.info/admin/get-Pharmacy/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token with request
            },
          }
        ); // Adjust the API endpoint to fetch the pharmacy
        setPharmacyData(response.data.pharamacy); // Populate the form with existing data
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
      }
    };

    fetchPharmacyData();
  }, [id]); // Fetch data when the ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacyData({
      ...pharmacyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const formData = new FormData();

    formData.append("phoneNumber", pharmacyData.phoneNumber);
    formData.append("pharmacyName", pharmacyData.pharmacyName);
    formData.append("pharmacyLocation", pharmacyData.pharmacyLocation);
    formData.append("pharmacyEmployee", pharmacyData.pharmacyEmployee);
    formData.append(
      "pharmacyEmployeeNumber",
      pharmacyData.pharmacyEmployeeNumber
    );
    try {
      const response = await axios.put(
        `https://api.rosheta.info/admin/edit-Pharmacy/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      );
      setShowModal(true); // Show modal on success
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      alert("Failed to update pharmacy. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.pharmacyContainer}>
        <h1>Edit Pharmacy</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <FaBuilding className={styles.icon} />
            <input
              type="text"
              name="pharmacyName"
              placeholder="Pharmacy Name"
              value={pharmacyData.pharmacyName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaMapMarkerAlt className={styles.icon} />
            <input
              type="text"
              name="pharmacyLocation"
              placeholder="Pharmacy Location"
              value={pharmacyData.pharmacyLocation}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaPhone className={styles.icon} />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Pharmacy Phone Number"
              value={pharmacyData.phoneNumber}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="pharmacyEmployee"
              placeholder="Employee Name"
              value={pharmacyData.pharmacyEmployee}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaIdBadge className={styles.icon} />
            <input
              type="number"
              name="pharmacyEmployeeNumber"
              placeholder="Pharmacy Employee Number"
              value={pharmacyData.pharmacyEmployeeNumber}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.createButton}>
            Update Pharmacy
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Pharmacy updated successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPharmacy;
