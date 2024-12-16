import React, { useState, useEffect } from "react";
import styles from "./PharmacistHome.module.css";
import { useParams } from "react-router-dom"; // Import useParams for accessing URL parameters
import PharmacistNavbar from "./PharmacistNavbar";
import { FaFilePrescription, FaIdCard, FaUser, FaStore, FaCalendarAlt } from "react-icons/fa"; // Import icons
import axios from "axios";

const PharmacistHome = () => {
  const { id } = useParams(); // Get the prescription ID from the URL

  const [prescriptions, setPrescriptions] = useState([]);
  const [countsPre, setCountsPre] = useState();
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const responsePre = await axios.patch(
          "http://localhost:8090/pharmacy/count-Prescription",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCountsPre(responsePre.data.dispensePrescriptions);

        const response = await axios.get(
          "http://localhost:8090/pharmacy/get-Prescriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [id, token]);

  return (
    <div className={styles.pageContainer}>
      <PharmacistNavbar />
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboard}>
          <FaFilePrescription className={styles.icon} />
          <h1>Prescriptions Dispensed</h1>
          <h2>{countsPre}</h2>
        </div>
        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th><FaIdCard /> ID</th>
              <th><FaUser /> Patient Name</th>
              <th><FaStore /> Pharmacy</th>
              <th><FaCalendarAlt /> Prescribed on</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td>{prescription.prescriptionId}</td>
                  <td>{prescription.patientName}</td>
                  <td>{prescription.pharmacyName}</td>
                  <td>{new Date(prescription.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noResults}>
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacistHome;