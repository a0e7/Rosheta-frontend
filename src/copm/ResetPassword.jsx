import React, { useState } from 'react';
import styles from './ResetPassword.module.css'; // Ensure you create this CSS file

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the new password and confirm password match
        if (newPassword === confirmPassword) {
            setMessage('Your password has been changed successfully.');
            // Reset input fields
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage('New password and confirmation do not match.');
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
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Change Password</button>
                    {message && <p className={styles.message}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;