import React, { useState, useEffect } from "react";
import styles from "./Viwepre.module.css"; // Ensure this path is correct
import PharmacistNavbar from "./PharmacistNavbar";
import { FaUser, FaFilePrescription, FaUserMd } from "react-icons/fa";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const Viewpre = () => {
  const { id } = useParams(); // Assuming the prescription ID is passed as a URL parameter
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    prescriptionDetails: [],
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

      try {
        const response = await axios.get(
          `http://localhost:8090/pharmacy/get-Prescription/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData(response.data.prescription);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [id]);

  return (
    <div className={styles.pageContainer}>
      <PharmacistNavbar />
      <div className={styles.contentContainer}>
        <h1>
          <FaFilePrescription /> Prescriptions Dispensed
        </h1>

        <div className={styles.detailsContainer}>
          <div className={styles.detailField}>
            <FaUser className={styles.icon} />
            <p className={styles.patientInfo}>
              <strong>Patient Name:</strong> {formData.patientName}
            </p>
          </div>
          <div className={styles.detailField}>
            <FaUserMd className={styles.icon} />
            <p className={styles.patientInfo}>
              <strong>Phone Number:</strong> {formData.phoneNumber || "N/A"}
            </p>
          </div>
        </div>

        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Usage</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {formData.prescriptionDetails.length > 0 ? (
              formData.prescriptionDetails.map((med, index) => (
                <tr key={index}>
                  <td>{med.medicineName || "N/A"}</td>
                  <td>{med.quantity || "N/A"}</td>
                  <td>{med.usage || "N/A"}</td>
                  <td>{med.note || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noResults}>
                  No medications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewpre;