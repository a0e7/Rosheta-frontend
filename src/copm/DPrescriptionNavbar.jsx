// PatientNavbar.jsx
import React from 'react';
import styles from './DPrescriptionNavbar.module.css'
import { Link } from 'react-router-dom';

const DPrescriptionNavbar = ({ onAddPatient, onSearchChange }) => {
    return (
        <div className={styles.navbar}>
            <h1>Prescriptions</h1>
            {/* <input 
                type="text" 
                placeholder="Search .." 
                onChange={onSearchChange} 
                className={styles.searchInput} 
            /> */}
            <Link to='/newprescription'>
                <button className={styles.addButton} onClick={onAddPatient}>
                    Add New Prescription
                </button>
            </Link>
        </div>
    );
};

export default DPrescriptionNavbar;