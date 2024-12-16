import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./Pharmacist.module.css"; // Import your CSS module
import Navbar from "./copm/Navbar";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaEye, FaEdit, FaBan } from "react-icons/fa"; // Import icons

const Pharmacist = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmActionId, setConfirmActionId] = useState(null); // Tracks pharmacist ID for confirmation
  const [confirmDeactivateId, setConfirmDeactivateId] = useState(null); // Tracks ID for deactivate confirmation

  useEffect(() => {
    const fetchPharmacists = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.rosheta.info/admin/get-Pharmacies",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token with request
            },
          }
        ); // Adjust the endpoint as needed
        setPharmacists(response.data.pharamacies);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchPharmacists();
  }, []); // Fetch pharmacists when the component mounts

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeactivate = async (id, isActive, confirm = false) => {
    const token = localStorage.getItem("token");

    if (confirm) {
      try {
        const endpoint = isActive
          ? `https://api.rosheta.info/admin/deactivate-Pharmacy/${id}`
          : `https://api.rosheta.info/admin/activate-Pharmacy/${id}`;

        // Send request to the appropriate endpoint
        await axios.patch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        });

        alert(
          `Pharamcy has been successfully ${
            isActive ? "deactivated" : "activated"
          }.`
        );
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error updating pharmacy status:", error);
      } finally {
        setConfirmDeactivateId(null); // Reset confirmation state
      }
    } else {
      // Show confirmation dialog
      setConfirmDeactivateId(id);
    }
  };

  const filteredPharmacists = pharmacists.filter((pharmacist) =>
    pharmacist.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pharmacistContainer}>
          <h1>
            <FaUser className={styles.icon} /> Pharmacists
          </h1>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for a pharmacist..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchBar}
            />
          </div>
          <Link to="/Creatpharmacy">
            <button className={styles.createButton}>Add New Pharmacy</button>
          </Link>
          <table className={styles.pharmacistTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Location</th>
                <th className={styles.tableHeader}>Phone</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPharmacists.length > 0 ? (
                filteredPharmacists.map((pharmacist) => (
                  <tr key={pharmacist._id} className={styles.pharmacistRow}>
                    <td>
                      <FaUser className={styles.pharmacistIcon} />
                      {pharmacist.pharmacyName}
                    </td>
                    <td>{pharmacist.pharmacyLocation}</td>
                    <td>{pharmacist.phoneNumber}</td>
                    <td className={styles.actionButtons}>
                      <Link to={`/Viewpharmacies/${pharmacist._id}`}>
                        <button className={styles.viewButton}>
                          <FaEye /> View
                        </button>
                      </Link>
                      <Link to={`/editpharmacies/${pharmacist._id}`}>
                        <button className={styles.editButton}>
                          <FaEdit /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleDeactivate(pharmacist._id, pharmacist.isActive)
                        }
                        className={
                          pharmacist.isActive
                            ? styles.deactivateButton
                            : styles.activateButton
                        }
                      >
                        <FaBan
                          style={{
                            color: pharmacist.isActive ? "inherit" : "red",
                          }}
                        />
                        {pharmacist.isActive ? "Deactivate" : "Activate"}
                      </button>
                      {confirmDeactivateId === pharmacist._id && (
                        <div className={styles.confirmationPopup}>
                          <p>
                            Are you sure you want to{" "}
                            {pharmacist.isActive ? "deactivate" : "activate"}{" "}
                            this Pharmacy?
                          </p>
                          <button
                            onClick={() =>
                              handleDeactivate(
                                pharmacist._id,
                                pharmacist.isActive,
                                true
                              )
                            }
                          >
                            Yes
                          </button>
                          <button onClick={() => setConfirmDeactivateId(null)}>
                            No
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noData}>
                    No pharmacists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacist;
