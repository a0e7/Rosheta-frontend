import React, { useState, useEffect } from "react";
import styles from "./ViweDp.module.css";
import { FaUser, FaClipboardList, FaPhone } from "react-icons/fa";
import NavbarD from "./NavberD"; // Ensure this path is correct for your Navbar component
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewDp = () => {
  const { id } = useParams(); // Assuming the prescription ID is passed as a URL parameter
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    prescriptionDetails: [
      { medicineName: "", quantity: "", usage: "", note: "" },
    ],
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

      try {
        const response = await axios.get(
          `https://api.rosheta.info/doctor/get-Prescription/${id}`,
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
      <NavbarD />
      <div className={styles.formContainer}>
        <h1>
          <FaClipboardList /> Prescription Details
        </h1>

        {/* Patient Details */}
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <p className={styles.staticText}>
            Patient Name: {formData.patientName}
          </p>
        </div>

        <div className={styles.inputGroup}>
          <FaPhone className={styles.icon} />
          <p className={styles.staticText}>
            Patient Number: {formData.phoneNumber}
          </p>
        </div>

        {/* Medications Table */}
        <table className={styles.medicationsTable}>
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
                <td colSpan="4">No medications available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDp;
