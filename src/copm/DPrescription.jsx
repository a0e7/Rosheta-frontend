// Patient.jsx
import React, { useState } from 'react';
import styles from'./DPrescription.module.css'
import { FaUser , FaFilePrescription, FaTrash, FaEdit } from 'react-icons/fa';
import NavbarD from './NavberD'
import DPrescriptionNavbar from './DPrescriptionNavbar'; // Import the new PatientNavbar component
import Dtaball from './Dtabll';

const DPrescription = () => {


    return (
        <div className={styles.container}>
            <NavbarD />
            <div className={styles.patientList}>
                <DPrescriptionNavbar 
                  
                    // onSearchChange={handleSearchChange} 
                />
              <Dtaball/>
     </div>
    </div>
    );
};

export default DPrescription;