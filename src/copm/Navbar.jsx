import React from "react";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaUserMd,
  FaFilePrescription,
  FaSignOutAlt,
  FaPills,
} from "react-icons/fa";
import styles from "./Navbar.module.css"; // Import CSS styles

const Navbar = () => {
  const navigate = useNavigate(); // Get navigate for navigation

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/"); // Redirect to the home or login page
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Admin Dashboard</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/admin">
            <FaHome className={styles.icon} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/docterad">
            <FaUserMd className={styles.icon} />
            Doctors
          </Link>
        </li>
        <li>
          <Link to="/medicien">
            <FaPills className={styles.icon} />
            Medicines
          </Link>
        </li>
        <li>
          <Link to="/Pharmacist">
            <FaUser className={styles.icon} />
            Pharmacists
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.navLink} onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} /> Logout
          </Link>
        </li>
      </ul>
    </nav>
    //    <Link to="/">Login</Link>
    //    <Link to="/admin">Admin</Link>
    //    <Link to="/notfond">Notfound</Link>

    //    </nav>
  );
};

export default Navbar;
