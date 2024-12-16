import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; // Create a CSS module for styling

const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className={styles.homeLink}>Go to Home</Link>
        </div>
    );
};

export default NotFound;