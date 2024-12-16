import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaPills,
  FaUser,
  FaUserPlus,
  FaFilePrescription,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Admin.module.css";
import Navbar from "./Navbar";

const Admin = () => {
  const location = useLocation();
  const { adminName, email } = location.state || {};

  // State variables to hold counts
  const [counts, setCounts] = useState({
    totalPharmacies: 0,
    totalPatients: 0,
    totalDoctors: 0,
    totalMedicines: 0,
  });

  const [countsPre, setCountsPre] = useState({
    prescriptions: 0,
    dispensedPrescriptions: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      try {
        // Fetch total counts
        const response = await axios.patch(
          "http://localhost:8090/admin/count-Users",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token with request
            },
          }
        ); // Update with your API endpoint
        setCounts({
          totalDoctors: response.data.totalDoctors,
          totalMedicines: response.data.totalMedicines,
          totalPharmacies: response.data.totalPharmacies,
          totalPatients: response.data.totalPatients,
        });
        const responsePre = await axios.patch(
          "http://localhost:8090/admin/count-Presc"
        ); // Update with your API endpoint
        setCountsPre({
          prescriptions: responsePre.data.prescriptions,
          dispensedPrescriptions: responsePre.data.dispensePrescriptions,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* <h1>Welcome Admin {adminName || "Guest"}</h1>
                <p>Your email is: {email}</p> */}
        <div className={styles.dashboardGrid}>
          <div className={styles.dashboard} data-tooltip="Total Doctors">
            <div className={styles.iconContainer}>
              <FaUserMd className={styles.Dicon} />
            </div>
            <h2>Doctors</h2>
            <p>Count: {counts.totalDoctors}</p>
          </div>
          <div className={styles.dashboard} data-tooltip="Total Medicines">
            <div className={styles.iconContainer}>
              <FaPills className={styles.Dicon} />
            </div>
            <h2>Medicines</h2>
            <p>Count: {counts.totalMedicines}</p>
          </div>
          <div className={styles.dashboard} data-tooltip="Total Pharmacists">
            <div className={styles.iconContainer}>
              <FaUserPlus className={styles.Dicon} />
            </div>
            <h2>Pharmacists</h2>
            <p>Count: {counts.totalPharmacies}</p>
          </div>
          <div className={styles.dashboard} data-tooltip="Total Prescriptions">
            <div className={styles.iconContainer}>
              <FaFilePrescription className={styles.Dicon} />
            </div>
            <h2>Prescriptions</h2>
            <p>Count: {countsPre.prescriptions}</p>
          </div>
          <div className={styles.dashboard} data-tooltip="Total Patients">
            <div className={styles.iconContainer}>
              <FaUser className={styles.Dicon} />
            </div>
            <h2>Patients</h2>
            <p>Count: {counts.totalPatients}</p>
          </div>
          <div
            className={styles.dashboard}
            data-tooltip="Total Dispensed Prescriptions"
          >
            <div className={styles.iconContainer}>
              <FaPrescriptionBottleAlt className={styles.Dicon} />
            </div>
            <h2>Dispensed Prescriptions</h2>
            <p>Count: {countsPre.dispensedPrescriptions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
