import React, { useState } from "react";
import styles from "./NewPrescription.module.css";
import {
  FaSearch,
  FaPlus,
  FaUser,
  FaClipboardList,
  FaPhone,
  FaInfoCircle,
  FaNotesMedical,
  FaCubes,
  FaTrash,
} from "react-icons/fa";
import NavbarD from "./NavberD";
import axios from "axios";

const NewPrescription = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    prescriptionDetails: [
      { medicineName: "", quantity: "", usage: "", note: "" },
    ],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

  const handleSearchChange = async (index, e) => {
    const value = e.target.value;
    const updatedPrescriptions = [...formData.prescriptionDetails];
    updatedPrescriptions[index].medicineName = value; // Update medicineName
    setFormData({ ...formData, prescriptionDetails: updatedPrescriptions });

    if (value) {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      try {
        const response = await axios.get(
          `http://localhost:8090/doctor/medicine-Search?query=${value}`,
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
    updatedPrescriptions[index].medicineName = med.medicineName; // Set selected medicine in medicineName
    setFormData({ ...formData, prescriptionDetails: updatedPrescriptions });
    setSearchResults([]); // Clear search results
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

  const handleDeletePrescription = (index) => {
    setFormData((prevState) => {
      const updatedPrescriptions = prevState.prescriptionDetails.filter((_, i) => i !== index);
      return { ...prevState, prescriptionDetails: updatedPrescriptions };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("prescriptionDetails")) {
      const match = name.match(/prescriptionDetails\[(\d+)\]\.(\w+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const key = match[2];

        setFormData((prevState) => {
          const updatedPrescriptions = [...(prevState.prescriptionDetails || [])];
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
      await axios.post(
        "http://localhost:8090/doctor/add-Prescription",
        newformData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertVisible(true); // Show alert on successful submission
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("Failed to create prescription. Please try again.");
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
          <FaClipboardList /> Create Prescription
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
                <button
                  type="button"
                  onClick={() => handleDeletePrescription(index)}
                  className={styles.deleteButton}
                >
                  <FaTrash className={styles.deleteIcon} />
                </button>
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
            <FaPlus /> Create Prescription
          </button>
        </form>

        {/* Alert Overlay */}
        {alertVisible && (
          <div className={styles.alertOverlay}>
            <div className={styles.alert}>
              <h2>Success!</h2>
              <p>Prescription created successfully!</p>
              <button onClick={closeAlert}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPrescription;