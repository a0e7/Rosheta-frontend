import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServerError.module.css'; // Create a CSS module for styling

const ServerError = () => {
    return (
        <div className={styles.serverErrorContainer}>
            <h1>500</h1>
            <h2>Internal Server Error</h2>
            <p>Oops! Something went wrong on our end.</p>
            <p>Please try again later or contact support if the problem persists.</p>
            <Link to="/" className={styles.homeLink}>Go to Home</Link>
        </div>
    );
};

export default ServerError;