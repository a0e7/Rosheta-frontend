import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./ResetPassword.module.css"; // Ensure you create this CSS file
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, ""); // Retrieve token from localStorage
      const decodedToken = jwtDecode(token);
      const response = await axios.put(
        "https://api.rosheta.info/auth/resetPassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);

      // Navigate based on the user role
      if (decodedToken.role === "pharmacy") {
        navigate("/pharmacyprofile");
      } else if (decodedToken.role === "doctor") {
        navigate("/docterprofile");
      }
      setOldPassword("");
      setNewPassword("");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSide}></div>
      <div className={styles.formSide}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Reset Password</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              className={styles.input}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Change Password
          </button>
          {message && <p className={styles.message}>{message}</p>}
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
