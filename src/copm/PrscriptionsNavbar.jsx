import React from "react";
import styles from "./PrscriptionsNavbar.module.css"; // Import your CSS module
import { Link } from "react-router-dom";

const PrscriptionsNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Prescriptions</h1>
      <Link to="/pharmacistprescrptions">
        {" "}
        {/* Correctly closing the Link component */}
        <button className={styles.dispenseButton}>Dispense</button>
      </Link>
    </nav>
  );
};

export default PrscriptionsNavbar;
