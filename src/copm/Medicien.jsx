// src/Medicien.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./Medicien.module.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlusCircle,
  FaPills,
  FaEye,
  FaEdit,
  FaTrash,
  FaUser,        // Icon for Name
  FaBuilding      // Icon for Company
} from "react-icons/fa";

const Medicien = () => {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8090/admin/get-Medicines",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token with request
            },
          }
        );
        setMedications(response.data.medicines); // Assuming the data is structured as shown
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []); // Empty dependency array means this runs once on mount

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedications = medications.filter((med) =>
    med.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      // Send request to delete the medication by ID
      await axios.delete(
        `http://localhost:8090/admin/delete-Medicine/${confirmDeleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      );

      // Show success message or perform any other actions here
      alert("Medication deleted successfully.");
      setMedications(medications.filter(med => med._id !== confirmDeleteId)); // Remove from state
    } catch (error) {
      console.error("Error deleting medication:", error);
      alert("Failed to delete medication. Please try again.");
    } finally {
      // Reset confirmation state
      setConfirmDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.medicationContainer}>
        <h1>
          <FaPills className={styles.headerIcon} /> Medications
        </h1>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for a medication..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
        </div>
        <Link to="/creatmedicien">
          <button className={styles.createButton}>
            <FaPlusCircle className={styles.createIcon} /> Add New Medication
          </button>
        </Link>
        <table className={styles.medicationTable}>
          <thead>
            <tr>
              <th><FaPills /> Name</th>
              <th><FaBuilding /> Company</th>
              <th><FaEye /> Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.length > 0 ? (
              filteredMedications.map((med) => (
                <tr key={med._id}>
                  <td>
                 
                    {med.medicineName}
                  </td>
                  <td>{med.medicineCompany}</td>
                  <td className={styles.actionButtons}>
                    <Link to={`/medicienva/${med._id}`}>
                      <button className={styles.actionButton}>
                        <FaEye /> View
                      </button>
                    </Link>
                    <Link to={`/editmedicen/${med._id}`}>
                      <button className={styles.actionButton}>
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDelete(med._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.noData}>
                  No medications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {confirmDeleteId && (
          <div className={styles.confirmDelete}>
            <p>Are you sure you want to delete this medication?</p>
            <button onClick={confirmDelete} className={styles.confirmButton}>
              Yes
            </button>
            <button onClick={cancelDelete} className={styles.cancelButton}>
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicien;