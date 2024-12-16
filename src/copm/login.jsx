import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import styles from "./Login.module.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8090/auth/login", {
        phoneNumber: phoneNumber,
        password: password,
      });

      const token = response.data.token; // Retrieve the token from the response
      const decodedToken = jwtDecode(token);

      // Store the user data object in local storage as a JSON string
      localStorage.setItem("token", JSON.stringify(token));

      // Navigate based on the user role
      if (decodedToken.role === "admin") {
        navigate("/admin", {
          state: { adminName: phoneNumber, email: "ahmed@gnmail.com" },
        });
      } else if (decodedToken.role === "doctor") {
        navigate("/homed", {
          state: { doctorName: phoneNumber, email: "ameer@gmail.com" },
        });
      } else if (decodedToken.role === "pharmacy") {
        navigate("/pharmacisthome", {
          state: { pharmacistName: phoneNumber, email: "zied@gmail.com" },
        });
      } else {
        setErrorMessage("Invalid role");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSide}></div>
      <div className={styles.formSide}>
        <div className={styles.form}>
          <h2>Login Updated</h2>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <input
            type="text"
            className={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="button" onClick={handleLogin}>
            <FaSignOutAlt className={styles.icon} /> Login
          </button>
          <div className={styles.forgotPassword}>
            <Link to="/forgetpassword" className={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
