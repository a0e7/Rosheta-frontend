import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for routing
import { FaPrescriptionBottleAlt, FaUser, FaUserMd, FaPills, FaCalendarAlt, FaHospital } from 'react-icons/fa'; // Import icons
import Navbar from './Navbar'; // Import your Navbar component
import styles from './AdminViewP.module.css'; // Import your CSS module

const AdminViewP = () => {
  const { id } = useParams(); // Get the prescription ID from the URL

  // Sample prescription data
  const prescriptionData = {
    id: 1,
    patientName: 'Ameer',
    doctorName: 'Dr. Smith',
    medications: [
      {
        name: 'Amoxicillin',
        usage: 'Take one capsule after meals',
        not: 'two weeks',
        quanty:'10',
      },
      {
        name: 'Ibuprofen',
        usage: 'Take two tablets before bed',
        not: 'one week',
        quanty:'10',
      },
    ],
    date: '2023-10-01',
    pharmacy: 'Pharmacy A',
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <FaPrescriptionBottleAlt className={styles.icon} /> Prescription Details
        </h1>
        <table className={styles.prescriptionTable}>
          <tbody>
            <tr>
              <td><FaUser /> Patient Name:</td>
              <td>{prescriptionData.patientName}</td>
            </tr>
            <tr>
              <td><FaUserMd /> Doctor Name:</td>
              <td>{prescriptionData.doctorName}</td>
            </tr>
            <tr>
              <td><FaCalendarAlt /> Date:</td>
              <td>{prescriptionData.date}</td>
            </tr>
            <tr>
              <td><FaHospital /> Pharmacy:</td>
              <td>{prescriptionData.pharmacy}</td>
            </tr>
          </tbody>
        </table>
        <h3>Medications</h3>
        <table className={styles.medicationsTable}>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Usage</th>
              <th>Notes</th>
              <th>quanty</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.medications.map((med, index) => (
              <tr key={index}>
                <td><FaPills /> {med.name}</td>
                <td>{med.usage}</td>
                <td>{med.not}</td>
                <td>{med.quanty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminViewP;