import React from 'react';
import { FaPrescriptionBottleAlt, FaUser , FaUserMd, FaPills, FaCalendarAlt, FaInfoCircle, FaHospital } from 'react-icons/fa'; // Import additional icons
import Navbar from './Navbar'; // Import the Navbar component
import styles from './AdminPrescriptions.module.css'; // Import your CSS module
import { Link } from 'react-router-dom';

const AdminPrescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      patientName: 'Ameer',
      doctorName: 'Dr. Smith',
      medication: 'Amoxicillin',
      usage: 'Take one capsule after meals',
      pharmacy: 'Pharmacy A',
      date: '2023-10-01',
    },
    {
      id: 2,
      patientName: 'Ziad',
      doctorName: 'Dr. Jones',
      medication: 'Ibuprofen',
      usage: 'Take two tablets before bed',
      pharmacy: 'Pharmacy B',
      date: '2023-09-28',
    },
    // Add more prescriptions as needed
  ];

  const handleViewClick = (id) => {
    // Handle the view button click (e.g., navigate to a detailed view)
    console.log(`View prescription with ID: ${id}`);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar /> {/* Add the Navbar here */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <FaPrescriptionBottleAlt className={styles.icon} /> All Prescriptions
        </h1> {/* Add class for styling */}
        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th><FaUser  className={styles.icon} /> ID</th>
              <th><FaUser  className={styles.icon} /> Patient Name</th>
              <th><FaUser Md className={styles.icon} /> Doctor Name</th>
              {/* <th><FaPills className={styles.icon} /> Medication</th>
              <th><FaInfoCircle className={styles.icon} /> Usage <span className={styles.iconInfo}>i</span></th> */}
              <th><FaCalendarAlt className={styles.icon} /> Date</th>
              <th><FaHospital className={styles.icon} /> Pharmacy</th>
              <th>Action</th> {/* New column for the action button */}
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.patientName}</td>
                <td>{prescription.doctorName}</td>
                {/* <td>{prescription.medication}</td>
                <td>{prescription.usage}</td> */}
                <td>{prescription.date}</td>
                <td>{prescription.pharmacy}</td>
                <td>
                 <Link  to={'/adminviewp'}> <button 
                    className={styles.viewButton} 
                    onClick={() => handleViewClick(prescription.id)}
                  >
                    View
                  </button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPrescriptions;