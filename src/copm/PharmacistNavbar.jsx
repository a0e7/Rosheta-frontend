import React from "react";
import styles from "./PharmacistNavbar.module.css";
import {
  FaHome,
  FaUserCircle,
  FaFilePrescription,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
const PharmacistNavbar = () => {
  const navigate = useNavigate(); // Get navigate for navigation

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/"); // Redirect to the home or login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Pharmacist Portal</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/pharmacisthome" className={styles.navLink}>
            <FaHome className={styles.icon} /> Home
          </Link>
        </li>

        <li>
          <Link to="/prescriptionsph" className={styles.navLink}>
            <FaFilePrescription className={styles.icon} />
            Prescriptions
          </Link>
        </li>
        <li>
          <Link to="/PharmacyProfile" className={styles.navLink}>
            <FaUserCircle className={styles.icon} />
            profile
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.navLink} onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default PharmacistNavbar;
