import React, { useState, useEffect } from 'react';
import styles from './PharmacistPrescrptions.module.css';
import PharmacistNavbar from './PharmacistNavbar';
import { FaFilePrescription, FaCheckCircle, FaPills, FaPrescriptionBottle, FaUser, FaUserMd } from 'react-icons/fa'; // Import icons
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const PharmacistPrescrptionsnew = () => {
    const { id } = useParams(); // Get the prescription ID from the URL
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedMedications, setSelectedMedications] = useState([]);
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    useEffect(() => {
        const fetchPrescriptionData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/prescriptions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const prescription = response.data.prescription;
                setPrescriptions([{
                    patientName: prescription.patient, // Assuming patient field gives the name
                    doctorName: prescription.doctor, // Assuming doctor field gives the doctor's name
                    medications: prescription.prescriptionDetails.map(med => ({
                        id: med._id,
                        name: med.medicineName,
                        quantity: med.quantity,
                        usage: med.usage,
                    })),
                    date: new Date(prescription.createdAt).toLocaleDateString(), // Format the date
                    notes: prescription.prescriptionId, // or any relevant note
                }]);
            } catch (error) {
                console.error('Error fetching prescription data:', error);
            }
        };

        fetchPrescriptionData();
    }, [id, token]); // Dependency array includes id and token

    const handleCheckboxChange = (medId) => {
        setSelectedMedications((prev) => {
            if (prev.includes(medId)) {
                return prev.filter((id) => id !== medId); // Remove if already selected
            } else {
                return [...prev, medId]; // Add if not selected
            }
        });
    };

    const handleSubmit = () => {
        // Logic for what happens when the button is clicked
        console.log("Selected Medications: ", selectedMedications);
    };

    return (
        <div className={styles.pageContainer}>
            <PharmacistNavbar />
            <div className={styles.formContainer}>
                <h1><FaFilePrescription /> Prescriptions Dispensed</h1>

                {/* Patient and Doctor Details */}
                {prescriptions.length > 0 && (
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailField}>
                            <FaUser className={styles.icon} />
                            <p>
                                <strong>Patient Name:</strong> {prescriptions[0].patientName}
                            </p>
                        </div>
                        <div className={styles.detailField}>
                            <FaUserMd className={styles.icon} />
                            <p>
                                <strong>Doctor Name:</strong> {prescriptions[0].doctorName}
                            </p>
                        </div>
                    </div>
                )}

                <table className={styles.prescriptionTable}>
                    <thead>
                        <tr>
                            <th>Medication</th>
                            <th>Quantity</th>
                            <th>Usage</th>
                            <th>Prescribed on</th>
                            <th>Notes</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.length > 0 ? (
                            prescriptions[0].medications.map((med) => (
                                <tr key={med.id}>
                                    <td>
                                        <FaPills className={styles.icon} />
                                        {med.name}
                                    </td>
                                    <td>{med.quantity}</td>
                                    <td>{med.usage}</td>
                                    <td>{prescriptions[0].date}</td>
                                    <td>{prescriptions[0].notes}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedMedications.includes(med.id)}
                                            onChange={() => handleCheckboxChange(med.id)}
                                        />
                                        <FaPrescriptionBottle className={styles.checkboxIcon} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.noResults}>No prescriptions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button className={styles.submitButton} onClick={handleSubmit}>
                    <FaCheckCircle className={styles.icon} /> Submit Selected Medications
                </button>
            </div>
        </div>
    );
};

export default PharmacistPrescrptionsnew;