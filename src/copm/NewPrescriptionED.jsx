import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import styles from "./NewPrescription.module.css";
import {
  FaSearch,
  FaPlus,
  FaUser,
  FaClipboardList,
  FaPhone,
  FaPills,
  FaInfoCircle,
  FaNotesMedical,
  FaCubes,
  FaTrash,
} from "react-icons/fa";
import NavbarD from "./NavberD";

const NewPrescriptionED = () => {
  const { id } = useParams(); // Get the doctor ID from URL parameters

  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    prescriptionDetails: [
      { medicineName: "", quantity: "", usage: "", note: "" },
    ],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertType, setAlertType] = useState(""); // State for alert type

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

      try {
        const response = await axios.get(
          `https://api.rosheta.info/doctor/get-Prescription/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData(response.data.prescription);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [id]);

  const handleSearchChange = async (index, e) => {
    const value = e.target.value;
    const updatedPrescriptions = [...formData.prescriptionDetails];
    updatedPrescriptions[index].medicineName = value;
    setFormData({ ...formData, prescriptionDetails: updatedPrescriptions });

    if (value) {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

      try {
        const response = await axios.get(
          `https://api.rosheta.info/doctor/medicine-Search?query=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMedicationSelect = (index, med) => {
    const updatedPrescriptions = [...formData.prescriptionDetails];
    updatedPrescriptions[index].medicineName = med.medicineName;
    setFormData({ ...formData, prescriptionDetails: updatedPrescriptions });
    setSearchResults([]);
  };

  const handleAddPrescription = () => {
    setFormData((prevState) => ({
      ...prevState,
      prescriptionDetails: [
        ...prevState.prescriptionDetails,
        { medicineName: "", quantity: "", usage: "", note: "" },
      ],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("prescriptionDetails")) {
      const match = name.match(/prescriptionDetails\[(\d+)\]\.(\w+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const key = match[2];

        setFormData((prevState) => {
          const updatedPrescriptions = [
            ...(prevState.prescriptionDetails || []),
          ];
          updatedPrescriptions[index] = {
            ...updatedPrescriptions[index],
            [key]: value,
          };
          return { ...prevState, prescriptionDetails: updatedPrescriptions };
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.prescriptionDetails ||
      !Array.isArray(formData.prescriptionDetails)
    ) {
      console.error("Prescription details are not properly initialized.");
      return;
    }

    const newFormData = new FormData();

    newFormData.append("patientName", formData.patientName);
    newFormData.append("phoneNumber", formData.phoneNumber);
    formData.prescriptionDetails.forEach((prescription, index) => {
      Object.keys(prescription).forEach((key) => {
        newFormData.append(
          `prescriptionDetails[${index}][${key}]`,
          prescription[key]
        );
      });
    });
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

    try {
      await axios.put(
        `https://api.rosheta.info/doctor/edit-Prescription/${id}`,
        newFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertMessage("Prescription updated successfully!"); // Set success message
      setAlertType("success"); // Set alert type
      setAlertVisible(true); // Show alert
    } catch (error) {
      console.error("Error updating prescription:", error);
      setAlertMessage("Failed to update prescription. Please try again."); // Set error message
      setAlertType("error"); // Set alert type
      setAlertVisible(true); // Show alert
    }
  };

  const closeAlert = () => {
    setAlertVisible(false); // Hide alert
  };

  return (
    <div className={styles.pageContainer}>
      <NavbarD />
      <div className={styles.formContainer}>
        <h1>
          <FaClipboardList /> Edit Prescription
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Patient Name */}
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              placeholder="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          {/* Patient Number */}
          <div className={styles.inputGroup}>
            <FaPhone className={styles.icon} />
            <input
              type="text"
              placeholder="Patient Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          {/* Additional Medications and Usages */}
          {formData.prescriptionDetails.map((prescription, index) => (
            <div key={index} className={styles.additionalInputGroup}>
              <div className={styles.inputWithIcon}>
                <FaSearch className={styles.icon} />
                <input
                  type="text"
                  placeholder="Search and select a medication..."
                  name={`prescriptionDetails[${index}].medicineName`}
                  value={prescription.medicineName}
                  onChange={(e) => handleSearchChange(index, e)}
                  className={styles.inputField}
                />
                {searchResults.length > 0 && prescription.medicineName && (
                  <div className={styles.searchResults}>
                    {searchResults.map((med) => (
                      <div
                        key={med._id}
                        className={styles.searchItem}
                        onClick={() => handleMedicationSelect(index, med)}
                      >
                        {med.medicineName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.medicationContainer}>
                <div className={styles.inputWithIcon}>
                  <FaCubes className={styles.icon} />
                  <input
                    type="number"
                    placeholder="Quantity"
                    name={`prescriptionDetails[${index}].quantity`}
                    value={prescription.quantity}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.inputWithIcon}>
                  <FaInfoCircle className={styles.icon} />
                  <input
                    type="text"
                    name={`prescriptionDetails[${index}].usage`}
                    placeholder="Usage (e.g., After dinner)"
                    value={prescription.usage}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.inputWithIcon}>
                  <FaNotesMedical className={styles.icon} />
                  <input
                    type="text"
                    placeholder="Note (e.g., 1/4, 1/2)"
                    name={`prescriptionDetails[${index}].note`}
                    value={prescription.note}
                    onChange={handleChange}
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddPrescription}
          >
            <FaPlus /> Add Medication
          </button>

          {/* Submit Button */}
          <button type="submit" className={styles.createButton}>
            <FaPlus /> Update Prescription
          </button>
        </form>

        {/* Alert Overlay */}
        {alertVisible && (
          <div className={styles.alertOverlay}>
            <div className={styles.alert}>
              <h2>{alertType === "success" ? "Success!" : "Error!"}</h2>
              <p>{alertMessage}</p>
              <button onClick={closeAlert}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPrescriptionED;
