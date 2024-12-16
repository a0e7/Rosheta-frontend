import React, { useState, useEffect } from "react";
import NavbarD from "./NavberD";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios
import styles from "./Home.module.css";
import { FaUser, FaFilePrescription } from "react-icons/fa";
import Taball from "./Taball";

const Homed = () => {
  const location = useLocation();
  const { DocterName, Demail } = location.state || {};

  const [dispensePrescriptions, setDispensePrescriptions] = useState(0);
  const [prescriptions, setPrescriptions] = useState(0);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage
      try {
        const response = await axios.patch(
          "http://localhost:8090/doctor/count-Prescription",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Make sure the token is prefixed with "Bearer "
            },
          }
        );

        // Assuming the response structure is as mentioned
        setPrescriptions(response.data.prescriptions);

        setDispensePrescriptions(response.data.dispensePrescriptions);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptionData(); // Fetch data when component mounts
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <div className={styles.container}>
        <NavbarD />
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboard}>
            <FaUser className={styles.Dicon} />
            <h1>Dispense Prescriptions Dashboard</h1>
            <h1>{dispensePrescriptions}</h1>
          </div>
          <div className={styles.dashboard}>
            <FaFilePrescription className={styles.Dicon} />
            <h1>Prescription Dashboard</h1>
            <h1>{prescriptions}</h1>
          </div>
        </div>
      </div>
      <Taball />
    </div>
  );
};

export default Homed;
