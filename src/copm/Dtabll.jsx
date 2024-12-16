import React, { useState, useEffect } from "react";
import {
  FaPrescriptionBottleAlt,
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaHospital,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dtabll.module.css";

const Dtaball = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

      try {
        const response = await axios.get(
          "https://api.rosheta.info/doctor/get-Prescriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    try {
      await axios.delete(
        `https://api.rosheta.info/doctor/delete-Prescription/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedPrescriptions = prescriptions.filter((p) => p._id !== id);
      setPrescriptions(updatedPrescriptions);
      setAlertMessage(`Deleted prescription with ID: ${id}`);
      setAlertVisible(true);
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete prescription. Please try again.");
    }
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    return (
      (prescription.patientName?.toLowerCase() || "").includes(
        searchTerm?.toLowerCase() || ""
      ) ||
      (prescription.prescriptionId?.toString() || "").includes(
        searchTerm?.toLowerCase() || ""
      )
    );
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <FaPrescriptionBottleAlt className={styles.icon} /> All Prescriptions
        </h1>
        <input
          type="text"
          placeholder="Search by patient name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        {filteredPrescriptions.length === 0 ? (
          <div className={styles.noResults}>
            <p>No results found.</p>
          </div>
        ) : (
          <table className={styles.prescriptionTable}>
            <thead>
              <tr>
                <th>
                  <FaUser className={styles.icon} /> ID
                </th>
                <th>
                  <FaUser className={styles.icon} /> Patient Name
                </th>
                <th>
                  <FaUserMd className={styles.icon} /> Doctor Name
                </th>
                <th>
                  <FaCalendarAlt className={styles.icon} /> Date
                </th>
                <th>
                  <FaHospital className={styles.icon} /> Pharmacy
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td>{prescription.prescriptionId}</td>
                  <td>{prescription.patientName}</td>
                  <td>{prescription.doctorName}</td>
                  <td>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </td>
                  <td>{prescription.pharmacyName || "N/A"}</td>
                  <td className={styles.actionIcons}>
                    <Link to={`/viwedp/${prescription._id}`}>
                      <FaEye className={styles.iconAction} title="View" />
                    </Link>
                    <Link to={`/newprescriptioned/${prescription._id}`}>
                      <FaEdit className={styles.iconAction} title="Edit" />
                    </Link>
                    <FaTrash
                      className={styles.iconAction}
                      title="Delete"
                      onClick={() => handleDelete(prescription._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Alert Overlay */}
        {alertVisible && (
          <div className={styles.alertOverlay}>
            <div className={styles.alert}>
              <h2>Success!</h2>
              <p>{alertMessage}</p>
              <button onClick={() => setAlertVisible(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dtaball;
