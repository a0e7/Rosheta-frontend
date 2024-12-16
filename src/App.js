import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./copm/login";
import Admin from "./copm/Admin";
import Navbar from "./copm/Navbar";
import HomeD from "./copm/HomeD";
import PharmacistHome from "./copm/PharmacistHome";
import DocterAD from "./copm/DocterAD";
import CreatDocter from "./CreatDocter";
import Pharmacist from "./Pharmacist";
import Medicien from "./copm/Medicien";
import CreatPharmacy from "./CreatPharmacy";
import CreatMedicien from "./copm/CreatMedicien";
import AdminPrescriptions from "./copm/AdminPrescriptions";
import DocterProfile from "./copm/DocterProfile";
import NavbarD from "./copm/NavberD";
import DPrescription from "./copm/DPrescription";
import DPrescriptionNavbar from "./copm/DPrescriptionNavbar";
import NewPrescription from "./copm/NewPrescription";
import PharmacistNavbar from "./copm/PharmacistNavbar";
import PharmacistPrescrptions from "./copm/PharmacistPrescrptions";
import PharmacistPrescrption from "./copm/PharmacistPrescrption";
import PharmacyProfile from "./copm/PharmacyProfile";
import PrescriptionsPh from "./copm/PrescriptionPh";
import PrscriptionsNavbar from "./copm/PrscriptionsNavbar";
import PrescriptionsDes from "./copm/PrescriptionsDes";
import Taball from "./copm/Taball";
import ViewDocter from "./copm/ViewDocter";
import EditDocter from "./copm/EditDocter";
import ViewPharmacies from "./copm/ViewPharmacies";
import EditPharmacy from "./copm/EditPharmacy";
import AdminViewP from "./copm/AdminViewP";
import MedicienVA from "./copm/MedicenVA";
import ViweDp from "./copm/ViweDp";
import ResetPassword from "./copm/ResetPassword";
import Viewpre from "./copm/Viwepre";
import NewPrescriptionED from "./copm/NewPrescriptionED";
import NotFound from "./copm/NotFound";
import ServerError from "./copm/ServerError";
import EditMedicen from "./copm/EditMedicen";
import PharmacistPrescrptionsnew from "./copm/PharmacistPrescrptionsnew";
import "./App.css";
import ProtectedRoute from "./copm/ProtectedRoute";
import ForgetPassword from "./copm/ForgetPassword";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Route for Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homed"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <HomeD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacisthome"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacistHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/docterad"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DocterAD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creatdocter"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreatDocter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pharmacist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Medicien />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creatpharmacy"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreatPharmacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creatmedicien"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreatMedicien />
            </ProtectedRoute>
          }
        />
        <Route path="/navbar" element={<Navbar />} />

        <Route path="/adminprescriptions" element={<AdminPrescriptions />} />
        <Route
          path="/docterprofile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DocterProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/navbard" element={<NavbarD />} />
        <Route
          path="/dprescription"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DPrescription />
            </ProtectedRoute>
          }
        />
        <Route path="/dprescriptionnavbar" element={<DPrescriptionNavbar />} />
        <Route
          path="/newprescription"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <NewPrescription />
            </ProtectedRoute>
          }
        />
        <Route path="/pharmacistnavbar" element={<PharmacistNavbar />} />
        <Route
          path="/pharmacistprescrptions"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacistPrescrptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacistprescrption/:id"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacistPrescrption />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacyprofile"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescriptionsph"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PrescriptionsPh />
            </ProtectedRoute>
          }
        />
        <Route path="/prscriptionsnavbar" element={<PrscriptionsNavbar />} />
        {/* <Route path="/prescriptionsdes" element={<PrescriptionsDes />} /> */}
        <Route
          path="/taball"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Taball />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewdocter/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewDocter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editdocter/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditDocter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewpharmacies/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewPharmacies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editpharmacies/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditPharmacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminviewp"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminViewP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicienva/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MedicienVA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viwedp/:id"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <ViweDp />
            </ProtectedRoute>
          }
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/viewpre/:id"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <Viewpre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newprescriptioned/:id"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <NewPrescriptionED />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editmedicen/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditMedicen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacistprescrptionsnew"
          element={
            <ProtectedRoute allowedRoles={["pharmacy"]}>
              <PharmacistPrescrptionsnew />
            </ProtectedRoute>
          }
        />

        <Route component={NotFound} />
        <Route path="/500" component={ServerError} />
        <Route path="/forgetpassword"element={<ForgetPassword/>}/>
      </Routes>
      {/* <Admin/> */}
      {/* <DocterAD/> */}
      {/* <CreatDocter/> */}
      {/* <AdminPrescriptions/> */}
    </div>
  );
};

export default App;
