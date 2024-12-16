import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PharmacistPrescrptions.module.css";
import PharmacistNavbar from "./PharmacistNavbar";
import {
  FaFilePrescription,
  FaCheckCircle,
  FaUser,
  FaUserMd,
  FaSearch,
} from "react-icons/fa";

const PharmacistPrescriptions = () => {
  const { id } = useParams(); // Assuming the prescription ID is passed as a URL parameter
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    prescriptionDetails: [],
  });
  const [prescriptionCount, setPrescriptionCount] = useState("");
  const [showTable, setShowTable] = useState(false);

  // Fetch prescription data
  const fetchPrescription = async () => {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    try {
      const response = await axios.get(
        `https://api.rosheta.info/pharmacy/search-Prescription/${prescriptionCount}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData(response.data.prescription);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching prescription:", error);
      setShowTable(false);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (medId) => {
    setFormData((prevFormData) => {
      const updatedPrescriptionDetails = prevFormData.prescriptionDetails.map(
        (med) => {
          if (med._id === medId) {
            return { ...med, isDispensed: true }; // Always set to true
          }
          return med;
        }
      );
      return {
        ...prevFormData,
        prescriptionDetails: updatedPrescriptionDetails,
      };
    });
  };

  // Submit updated prescription details
  const handleSubmit = async () => {
    if (
      !formData.prescriptionDetails ||
      !Array.isArray(formData.prescriptionDetails)
    ) {
      console.error("Prescription details are not properly initialized.");
      return;
    }

    const newformData = new FormData();
    newformData.append("patientName", formData.patientName);
    newformData.append("phoneNumber", formData.phoneNumber);

    formData.prescriptionDetails.forEach((prescription, index) => {
      Object.keys(prescription).forEach((key) => {
        newformData.append(
          `prescriptionDetails[${index}][${key}]`,
          prescription[key]
        );
      });
    });

    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    try {
      const response = await axios.put(
        `https://api.rosheta.info/pharmacy/dispense-Prescription/${formData._id}`,
        newformData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Prescription updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <PharmacistNavbar />
      <div className={styles.formContainer}>
        <h1>
          <FaFilePrescription /> Prescriptions Dispensed
        </h1>

        {/* Prescription Count Input */}
        <div className={styles.inputWithButton}>
          <input
            type="text"
            placeholder="Enter number of prescriptions..."
            value={prescriptionCount}
            onChange={(e) => setPrescriptionCount(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={fetchPrescription} className={styles.fetchButton}>
            <FaSearch /> Fetch Prescription
          </button>
        </div>

        {/* Patient and Doctor Details */}
        {showTable && (
          <>
            <div className={styles.detailsContainer}>
              <div className={styles.detailField}>
                <FaUser className={styles.icon} />
                <p>
                  <strong>Patient Name:</strong> {formData.patientName}
                </p>
              </div>
              <div className={styles.detailField}>
                <FaUserMd className={styles.icon} />
                <p>
                  <strong>Phone Number:</strong> {formData.phoneNumber || "N/A"}
                </p>
              </div>
            </div>

            {/* Medications Table */}
            <table className={styles.medicationsTable}>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Quantity</th>
                  <th>Usage</th>
                  <th>Note</th>
                  <th>Dispensed</th>
                </tr>
              </thead>
              <tbody>
                {formData.prescriptionDetails?.length > 0 ? (
                  formData.prescriptionDetails.map((med) => (
                    <tr key={med._id}>
                      <td>{med.medicineName || "N/A"}</td>
                      <td>{med.quantity || "N/A"}</td>
                      <td>{med.usage || "N/A"}</td>
                      <td>{med.note || "N/A"}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={med.isDispensed}
                          onChange={() => handleCheckboxChange(med._id)}
                          disabled={med.isDispensed}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No medications available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Submit Button */}
            <button className={styles.submitButton} onClick={handleSubmit}>
              <FaCheckCircle className={styles.icon} /> Submit Selected
              Medications
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacistPrescriptions;
