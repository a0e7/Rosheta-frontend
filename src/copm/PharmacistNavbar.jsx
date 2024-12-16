import React from "react";
import styles from'./PharmacistNavbar.module.css'
import { FaHome,  FaUserCircle  , FaFilePrescription,FaSignOutAlt } from 'react-icons/fa'

import { Link } from 'react-router-dom';
const PharmacistNavbar = () => {


    return (
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1>Pharmacist Portal</h1>
          </div>
          <ul className={styles.navLinks}>
            <li>
              < Link to="/pharmacisthome" className={styles.navLink}>
              <FaHome className={styles.icon} /> Home</Link>
            </li>
         
            <li>
            <Link to="/prescriptionsph" className={styles.navLink}>  
              <FaFilePrescription className={styles.icon} />Prescriptions</Link>
            </li>
            <li>
            <Link to="/PharmacyProfile" className={styles.navLink}>  
              < FaUserCircle  className={styles.icon} />profile</Link>
            </li>
            <li>
            <Link to="/" className={styles.navLink}>  
              <FaSignOutAlt className={styles.icon} />loguot</Link>
            </li>
          </ul>
        </nav>
      );

}
export default PharmacistNavbar;