// src/admin/CreatMedicien.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { FaPills, FaIndustry, FaGlobe } from "react-icons/fa"; // Import icons
import styles from "./MedicenVA.module.css"; // Import your CSS module
import Navbar from "./Navbar";
import { useParams } from "react-router-dom"; // Import useParams

const MedicienVA = () => {
  const { id } = useParams(); // Get the medication ID from URL parameters
  const [medicienData, setMedicienData] = useState({
    medicineName: "",
    medicineChemicalName: "",
    medicineCompany: "",
    medicineOrgin: "",
  });

  // Fetch medication data if an ID is provided
  useEffect(() => {
    const fetchMedicationData = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://api.rosheta.info/admin/get-Medicines/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send token with request
              },
            }
          ); // Adjust the API endpoint

          setMedicienData(response.data.medicine);
        } catch (error) {
          console.error("Error fetching medication data:", error);
        }
      }
    };

    fetchMedicationData();
  }, [id]); // Fetch data if ID changes

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.medicienContainer}>
        <h1>View Medication</h1>
        <table className={styles.medicationTable}>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FaPills className={styles.icon} /> Medication Name
              </td>
              <td>{medicienData.medicineName}</td>
            </tr>
            <tr>
              <td>
                <FaPills className={styles.icon} /> Chemical Name
              </td>
              <td>{medicienData.medicineChemicalName}</td>
            </tr>
            <tr>
              <td>
                <FaIndustry className={styles.icon} /> Company
              </td>
              <td>{medicienData.medicineCompany}</td>
            </tr>
            <tr>
              <td>
                <FaGlobe className={styles.icon} /> Origin
              </td>
              <td>{medicienData.medicineOrgin}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicienVA;
