// src/admin/CreatPharmacy.js
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./CreatPharmacy.module.css"; // Import your CSS module
import Navbar from "./copm/Navbar";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaLock,
  FaUser,
  FaIdBadge,
} from "react-icons/fa"; // Import icons

const CreatPharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: "",
    pharmacyLocation: "",
    phoneNumber: "",
    pharmacyEmployee: "",
    pharmacyEmployeeNumber: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacyData({
      ...pharmacyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("password", pharmacyData.password);
    formData.append("phoneNumber", pharmacyData.phoneNumber);
    formData.append("pharmacyName", pharmacyData.pharmacyName);
    formData.append("pharmacyLocation", pharmacyData.pharmacyLocation);
    formData.append("pharmacyEmployee", pharmacyData.pharmacyEmployee);
    formData.append(
      "pharmacyEmployeeNumber",
      pharmacyData.pharmacyEmployeeNumber
    );

    try {
      const response = await axios.post(
        "https://api.rosheta.info/admin/add-Pharm",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      );
      console.log("Pharmacy Data Submitted:", response.data);
      setShowModal(true); // Show modal on success
      // Optionally reset the form
      setPharmacyData({
        pharmacyName: "",
        pharmacyLocation: "",
        phoneNumber: "",
        password: "",
        pharmacyEmployee: "",
        pharmacyEmployeeNumber: "",
      });
    } catch (error) {
      console.error("Error creating pharmacy:", error);
      alert("Failed to create pharmacy. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.pharmacyContainer}>
        <h1>Create Pharmacy</h1>
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
              type="tel" // Change to "tel" for phone numbers
              name="phoneNumber"
              placeholder="Pharmacy Phone Number"
              value={pharmacyData.phoneNumber}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={pharmacyData.password}
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
            Create Pharmacy
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Pharmacy created successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatPharmacy;
