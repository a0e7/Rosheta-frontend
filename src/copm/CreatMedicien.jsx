// src/admin/CreatMedicien.js
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./CreatMedicien.module.css"; // Import your CSS module
import Navbar from "./Navbar";
import { FaPills, FaIndustry, FaGlobe, FaSave, FaUpload } from "react-icons/fa"; // Import icons

const CreatMedicien = () => {
  const [medicienData, setMedicienData] = useState({
    medicineName: "",
    medicineChemicalName: "",
    medicineCompany: "",
    medicineOrgin: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMedicienData((prevData) => ({
      ...prevData,
      image: file, // Update the image field with the selected file
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicienData({
      ...medicienData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const formData = new FormData();

    formData.append("medicineName", medicienData.medicineName);
    formData.append("medicineChemicalName", medicienData.medicineChemicalName);
    formData.append("medicineCompany", medicienData.medicineCompany);
    formData.append("medicineOrgin", medicienData.medicineOrgin);
    formData.append("image", medicienData.image);

    try {
      const response = await axios.post(
        "http://localhost:8090/admin/add-Medicine",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      );
      console.log("Medication Data Created:", response.data);
      setShowModal(true); // Show modal on success
      // Optionally reset the form
      setMedicienData({
        medicineName: "",
        medicineChemicalName: "",
        medicineCompany: "",
        medicineOrgin: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating medication:", error);
      alert("There was an error creating the medication.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.medicienContainer}>
        <h1>Create Medication</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FaPills className={styles.icon} />
            <input
              type="text"
              name="medicineName"
              placeholder="Medication Name"
              value={medicienData.medicineName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <FaPills className={styles.icon} />
            <input
              type="text"
              name="medicineChemicalName"
              placeholder="Chemical Name"
              value={medicienData.medicineChemicalName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <FaIndustry className={styles.icon} />
            <input
              type="text"
              name="medicineCompany"
              placeholder="Company"
              value={medicienData.medicineCompany}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <FaGlobe className={styles.icon} />
            <input
              type="text"
              name="medicineOrgin"
              placeholder="Origin"
              value={medicienData.medicineOrgin}
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
            <FaSave className={styles.icon} /> Create Medication
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Medication created successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatMedicien;