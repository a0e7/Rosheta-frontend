import styles from "./PrescriptionPh.module.css";
import PharmacistNavbar from "./PharmacistNavbar";
import PrscriptionsNavbar from "./PrscriptionsNavbar";
import { useLocation, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaIdCard, FaUser, FaStore, FaCalendar, FaTools } from "react-icons/fa"; // Import icons

const PrescriptionsPh = () => {
  const { id } = useParams(); // Get the prescription ID from the URL

  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patientName = prescription.patientName?.toLowerCase() || "";
    const id = prescription.prescriptionId?.toString() || "";
    return (
      patientName.includes(searchTerm.toLowerCase()) || id.includes(searchTerm)
    );
  });

  return (
    <div className={styles.pageContainer}>
      <PharmacistNavbar />
      <div className={styles.contentContainer}>
        <PrscriptionsNavbar />
        <div className={styles.header}>
          <h1>Prescriptions Dispensed</h1>
          <h2>{prescriptions.length} Total Prescriptions</h2>
        </div>
        <input
          type="text"
          placeholder="Search by Patient Name or Prescription ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />

        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th><FaIdCard /> ID</th>
              <th><FaUser /> Patient Name</th>
              <th><FaStore /> Pharmacy Name</th>
              <th><FaCalendar /> Prescribed on</th>
              <th><FaTools /> Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <tr key={prescription._id}>
                  <td>{prescription.prescriptionId}</td>
                  <td>{prescription.patientName}</td>
                  <td>{prescription.pharmacyName}</td>
                  <td>
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <Link to={`/Viewpre/${prescription._id}`}>
                      <button className={styles.viewButton}>
                        <FaEye /> View
                      </button>
                    </Link>
                    <Link to={`/PharmacistPrescrption/${prescription._id}`}>
                      <button className={styles.updateButton}>
                        <FaEdit /> Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noResults}>
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

export default PrescriptionsPh;