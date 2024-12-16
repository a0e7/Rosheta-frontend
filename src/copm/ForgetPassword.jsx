import React, { useState } from 'react';
import styles from './ForgetPassword.module.css';
import { Link } from 'react-router-dom';
import { FaPhone, FaKey, FaPaperPlane } from 'react-icons/fa';

const ForgetPassword = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Track the current step
  const [message, setMessage] = useState(''); // State for message

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleButtonClick = () => {
    if (step === 1) {
      // Simulate sending the code
      console.log('Code sent to:', phone);
      setMessage('A verification code has been sent to your phone.');
      setStep(2); // Move to the next step
    } else if (step === 2) {
      // Simulate code verification
      console.log('Code entered:', code);
      setMessage('Code verified successfully, please set your new password.');
      setStep(3); // Move to new password step
    } else if (step === 3) {
      // Logic to submit the new password
      console.log('New password set:', newPassword);
      setMessage('Your password has been reset successfully!');
      // Add further logic to handle the password reset (e.g., API call)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSide}></div> {/* Image Side */}
      <div className={styles.formSide}>
        <div className={styles.form}>
          <h2>Forget Password</h2>
          {message && <div className={styles.message}>{message}</div>} {/* Display message */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <FaPhone className={styles.icon} />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handlePhoneChange}
                required
                className={styles.input}
                style={{ display: step >= 1 ? 'block' : 'none' }} // Always show this field
              />
            </div>

            <div className={styles.inputWrapper}>
              <FaKey className={styles.icon} />
              <input
                type="text"
                placeholder="Enter the code"
                value={code}
                onChange={handleCodeChange}
                required
                className={styles.input}
                style={{ display: step >= 2 ? 'block' : 'none' }} // Show this field if step is 2 or higher
              />
            </div>

            <div className={styles.inputWrapper}>
              <FaKey className={styles.icon} />
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                className={styles.input}
                style={{ display: step >= 3 ? 'block' : 'none' }} // Show this field if step is 3
              />
            </div>

            <button type="button" onClick={handleButtonClick} className={styles.button}>
              <FaPaperPlane /> {step === 1 ? 'Send Code' : step === 2 ? 'Submit Code' : 'Submit New Password'}
            </button>

            <div className={styles.forgotPassword}>
              <Link to='/' className={styles.link}>Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;