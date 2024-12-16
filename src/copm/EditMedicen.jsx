// src/admin/EditMedicen.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./EditMedicen.module.css"; // Import your CSS module
import Navbar from "./Navbar";
import { useParams } from "react-router-dom"; // Import useParams
import { FaPills, FaIndustry, FaGlobe, FaSave, FaUpload } from "react-icons/fa"; // Import icons

const EditMedicen = () => {
  const { id } = useParams(); // Get the medication ID from URL parameters
  const [medicienData, setMedicienData] = useState({
    medicineName: "",
    medicineChemicalName: "",
    medicineCompany: "",
    medicineOrgin: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch medication data when component mounts or ID changes
  useEffect(() => {
    const fetchMedicationData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:8090/admin/get-Medicines/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send token with request
              },
            }
          ); // Adjust the API endpoint
          setMedicienData(response.data.medicine);
        } catch (error) {
          console.error("Error fetching medication data:", error);
        }
      }
    };

    fetchMedicationData();
  }, [id]); // Fetch data if ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicienData({
      ...medicienData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMedicienData((prevData) => ({
      ...prevData,
      image: file, // Update the image field with the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("medicineName", medicienData.medicineName);
    formData.append("medicineChemicalName", medicienData.medicineChemicalName);
    formData.append("medicineCompany", medicienData.medicineCompany);
    formData.append("medicineOrgin", medicienData.medicineOrgin);
    if (medicienData.image instanceof File) {
      formData.append("image", medicienData.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8090/admin/edit-Medicine/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      ); // Update the medication
      setShowModal(true); // Show modal on success
    } catch (error) {
      console.error("Error updating medication data:", error);
      alert("There was an error updating the medication."); // Notify user of error
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.medicienContainer}>
        <h1>Edit Medication</h1>
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
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.createButton}>
            <FaSave className={styles.icon} /> Edit Medication
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Success</h2>
            <p>Medication updated successfully!</p>
            <button onClick={handleCloseModal} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMedicen;
