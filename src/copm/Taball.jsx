// src/copm/AdminPrescriptions.js
import React, { useEffect, useState } from "react";
import {
  FaPrescriptionBottleAlt,
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaHospital,
} from "react-icons/fa"; // Import icons
import axios from "axios"; // Import Axios
import styles from "./Taball.module.css"; // Import your CSS module
import { useParams } from "react-router-dom"; // Import useParams

const Taball = () => {
  const { id } = useParams(); // Get the prescription ID from the URL
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

  const [prescriptions, setPrescriptions] = useState([]); // State to hold prescriptions

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Fetch all prescriptions if id is not provided; otherwise fetch by id
        const response = await axios.get(
          "http://localhost:8090/doctor/get-Prescriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPrescriptions(response.data.prescriptions); // If fetching by ID, wrap it in an array
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPrescriptions();
  }, [id, token]); // Empty dependency array to run once on mount

  // Only show the last three prescriptions
  const lastThreePrescriptions = prescriptions.slice(-3);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <FaPrescriptionBottleAlt className={styles.icon} /> Last Prescriptions
        </h1>
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
            </tr>
          </thead>
          <tbody>
            {lastThreePrescriptions.length > 0 ? (
              lastThreePrescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td>{prescription.prescriptionId}</td>{" "}
                  <td>{prescription.patientName}</td>{" "}
                  <td>{prescription.doctorName}</td>{" "}
                  <td>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </td>{" "}
                  <td>
                    {prescription.pharmacyName
                      ? prescription.pharmacyName
                      : "N/A"}
                  </td>{" "}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.noData}>
                  No Prescription found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Taball;
