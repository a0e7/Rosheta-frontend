// import { Link } from "react-router-dom"; // Import Link for navigation
// import styles from "./PrescriptionsDes.module.css";
// import PharmacistNavbar from "./PharmacistNavbar";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams
// const PrescriptionsDes = () => {
//   // Sample prescriptions data without medication and usage details
//   const { id } = useParams(); // Get the doctor ID from URL parameters

//   const [formData, setFormData] = useState({
//     patientName: "",
//     phoneNumber: "",
//     prescriptionDetails: [
//       { medicineName: "", quantity: "", usage: "", note: "" },
//     ],
//     isDispensed: false,
//   });

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage

//       try {
//         const response = await axios.get(
//           `http://localhost:8090/doctor/get-Prescription/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in the request headers
//             },
//           }
//         );
//         // Assuming the response structure is as mentioned
//         setFormData(response.data.prescription); // Set the prescriptions state
//       } catch (error) {
//         console.error("Error fetching prescriptions:", error);
//       }
//     };

//     fetchPrescriptions(); // Fetch prescriptions when the component mounts
//   }, [id]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPrescriptions = prescriptions.filter(
//     (prescription) =>
//       prescription.patientName
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       prescription.id.toString().includes(searchTerm)
//   );

//   return (
//     <div className={styles.pageContainer}>
//       <PharmacistNavbar />
//       <div className={styles.contentContainer}>
//         <div className={styles.header}>
//           <h1>Prescriptions Dispensed</h1>
//         </div>
//         <input
//           type="text"
//           placeholder="Search by Patient Name or Prescription ID..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className={styles.searchInput}
//         />

//         {searchTerm && filteredPrescriptions.length > 0 ? (
//           <table className={styles.prescriptionTable}>
//             <thead>
//               <tr>
//                 <th>Prescription No.</th>
//                 <th>Patient Name</th>
//                 <th>Doctor Name</th>
//                 <th>Pharmacy Name</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPrescriptions.map((prescription) => (
//                 <tr key={prescription.id}>
//                   <td>
//                     <Link
//                       to="/PharmacistPrescrptions"
//                       className={styles.prescriptionLink}
//                     >
//                       {prescription.id}
//                     </Link>
//                   </td>
//                   <td>
//                     <Link
//                       to="/PharmacistPrescrptions"
//                       className={styles.prescriptionLink}
//                     >
//                       {prescription.patientName}
//                     </Link>
//                   </td>
//                   <td>
//                     <Link
//                       to="/PharmacistPrescrptions"
//                       className={styles.prescriptionLink}
//                     >
//                       {prescription.doctorName}
//                     </Link>
//                   </td>
//                   <td>
//                     <Link
//                       to="/PharmacistPrescrptions"
//                       className={styles.prescriptionLink}
//                     >
//                       {prescription.pharmacyName}
//                     </Link>
//                   </td>
//                   <td>
//                     <Link
//                       to="/PharmacistPrescrptions"
//                       className={styles.prescriptionLink}
//                     >
//                       {prescription.date}
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           searchTerm && (
//             <div className={styles.noResults}>No prescriptions found.</div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionsDes;
