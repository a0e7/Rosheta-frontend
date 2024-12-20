import React from "react";
// import { Link } from 'react-router-dom';
import styles from "./NavbarD.module.css";
import {
  FaHome,
  FaUserCircle,
  FaFilePrescription,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarD = () => {
  const navigate = useNavigate(); // Get navigate for navigation

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/"); // Redirect to the home or login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Doctor's Portal</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/homed" className={styles.navLink}>
            <FaHome className={styles.icon} /> Home
          </Link>
        </li>

        <li>
          <Link to="/dprescription" className={styles.navLink}>
            <FaFilePrescription className={styles.icon} />
            Prescriptions
          </Link>
        </li>
        <li>
          <Link to="/docterprofile" className={styles.navLink}>
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

export default NavbarD;
