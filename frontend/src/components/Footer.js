import React from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from '@/src/styles/Footer.module.css'; // Import footer styling

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <Image
            src="/WS24-logo-RGB_horizontal-dates-colour-300x51.png"
            alt="Web Summit Logo"
            width={194}
            height={32}
          />
        </div>
        <div className={styles.link}>
          {/* Add footer content here */}
          <p>&copy; {new Date().getFullYear()} Your Website Name</p>
          {/* Add a link back to the homepage */}
          <Link href="/">
            Back to Homepage
          </Link>
        </div>
      </footer>
    );
}

export default Footer;