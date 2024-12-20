import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import styles from "./DocterAD.module.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUserPlus,
  FaUserMd,
  FaEdit,
  FaBan,
  FaEye,
  FaCheckCircle, // Icon for activation
  FaTimesCircle, // Icon for deactivation
  FaUser, // Icon for Name
  FaBriefcase, // Icon for Proficiency
  FaPhone, // Icon for Phone
} from "react-icons/fa";

const DocterAD = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeactivateId, setConfirmDeactivateId] = useState(null);

  const fetchDoctors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://api.rosheta.info/admin/get-Doctors",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Send token with request
          },
        }
      );
      setDoctors(response.data.doctors); // Update according to your API response structure
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDeactivate = async (id, isActive, confirm = false) => {
    const token = localStorage.getItem("token");

    if (confirm) {
      try {
        const endpoint = isActive
          ? `https://api.rosheta.info/admin/deactivate-Doctor/${id}`
          : `https://api.rosheta.info/  admin/activate-Doctor/${id}`;

        // Send request to the appropriate endpoint
        await axios.patch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        });

        alert(
          `Doctor has been successfully ${
            isActive ? "deactivated" : "activated"
          }.`
        );

        // Refetch the list of doctors
        fetchDoctors();
      } catch (error) {
        console.error("Error updating doctor status:", error);
      } finally {
        setConfirmDeactivateId(null); // Reset confirmation state
      }
    } else {
      // Show confirmation dialog
      setConfirmDeactivateId(id);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for Doctor ID: ${id} is not implemented yet.`);
  };

  const handleView = (id) => {
    alert(`View functionality for Doctor ID: ${id} is not implemented yet.`);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.doctorContainer}>
          <h1>
            <FaUserMd className={styles.createIcon} /> Doctors
          </h1>

          {/* Search Bar */}
          <div className={styles.searchBarWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for a doctor..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchBar}
            />
          </div>

          {/* Create New Doctor Button */}
          <Link to="/creatdocter">
            <button className={styles.createButton}>
              <FaUserPlus className={styles.createIcon} /> Create New Doctor
            </button>
          </Link>

          {/* Doctor Table */}
          <table className={styles.doctorTable}>
            <thead>
              <tr>
                <th>
                  <FaUser /> Name
                </th>
                <th>
                  <FaBriefcase /> Proficiency
                </th>
                <th>
                  <FaPhone /> Phone
                </th>
                <th>
                  <FaEye /> Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className={styles.doctorRow}>
                    <td>{`${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`}</td>
                    <td>{doctor.proficiency}</td>
                    <td>{doctor.PhoneNumber}</td>
                    <td className={styles.actionButtons}>
                      <Link to={`/viewdocter/${doctor._id}`}>
                        <button className={styles.viewButton}>
                          <FaEye /> View
                        </button>
                      </Link>
                      <Link to={`/editdocter/${doctor._id}`}>
                        <button className={styles.editButton}>
                          <FaEdit /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleDeactivate(doctor._id, doctor.isActive)
                        }
                        className={styles.deactivateButton}
                        title={doctor.isActive ? "Deactivate" : "Activate"}
                      >
                        {doctor.isActive ? (
                          <FaCheckCircle className={styles.activeIcon} />
                        ) : (
                          <FaTimesCircle className={styles.inactiveIcon} />
                        )}
                      </button>
                      {confirmDeactivateId === doctor.id && (
                        <div className={styles.confirmationPopup}>
                          <p>
                            Are you sure you want to {actionType} this doctor?
                          </p>
                          <button
                            onClick={() =>
                              handleDeactivate(doctor._id, doctor.isActive)
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
                    No doctors found.
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

export default DocterAD;
