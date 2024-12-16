import React, { useState } from "react";
import axios from "axios"; // Import Axios
import styles from "./ForgetPassword.module.css";
import { Link } from "react-router-dom";
import { FaPhone, FaKey, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Track the current step
  const [message, setMessage] = useState(""); // State for message
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const handleButtonClick = async () => {
    if (step === 1) {
      // Step 1: Send verification code
      try {
        const response = await axios.post("http://localhost:8090/auth/verfiy", {
          phoneNumber: phone,
        });
        setMessage(response.data.message);
        setStep(2); // Move to the next step
      } catch (error) {
        console.error("Error sending verification code:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to send code."
        );
      }
    } else if (step === 2) {
      // Step 2: Verify the code
      try {
        const response = await axios.post("http://localhost:8090/auth/verfiy", {
          phoneNumber: phone,
          verificationCode: code,
        });
        setMessage(response.data.message);
        setStep(3); // Move to new password step
      } catch (error) {
        console.error("Error verifying code:", error);
        setErrorMessage(error.response?.data?.message || "Invalid code.");
      }
    } else if (step === 3) {
      // Step 3: Reset password
      try {
        const response = await axios.put(
          "http://localhost:8090/auth/forgetPassword",
          {
            phoneNumber: phone,
            newPassword,
          }
        );
        setMessage(response.data.message);
        setNewPassword(""); // Clear new password field
        setErrorMessage(""); // Clear any previous error messages
        navigate("/");
      } catch (error) {
        console.error("Error resetting password:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to reset password."
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSide}></div> {/* Image Side */}
      <div className={styles.formSide}>
        <div className={styles.form}>
          <h2>Forget Password</h2>
          {message && <div className={styles.message}>{message}</div>}
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <FaPhone className={styles.icon} />
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
                style={{ display: step >= 1 ? "block" : "none" }} // Always show this field
              />
            </div>

            <div
              className={styles.inputWrapper}
              style={{ display: step >= 2 ? "block" : "none" }}
            >
              <FaKey className={styles.icon} />
              <input
                type="text"
                placeholder="Enter the code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div
              className={styles.inputWrapper}
              style={{ display: step >= 3 ? "block" : "none" }}
            >
              <FaKey className={styles.icon} />
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <button
              type="button"
              onClick={handleButtonClick}
              className={styles.button}
            >
              <FaPaperPlane />{" "}
              {step === 1
                ? "Send Code"
                : step === 2
                ? "Submit Code"
                : "Submit New Password"}
            </button>

            <div className={styles.forgotPassword}>
              <Link to="/" className={styles.link}>
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
