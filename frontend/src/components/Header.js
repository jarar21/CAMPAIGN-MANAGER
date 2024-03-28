import Link from "next/link";
import Image from "next/image";
import styles from "@/src/styles/Header.module.css";
import { IoTicket } from "react-icons/io5";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/WS24-logo-RGB_horizontal-dates-colour-300x51.png"
          alt="Web Summit Logo"
          width={194}
          height={32}
        />
      </div>

      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/addCampaign">
              <div className={styles.menuLink}>Add Campaign</div>
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/campaigns">
              <div className={styles.menuLink}>All Campaigns</div>
            </Link>
          </li>
        </ul>
      </nav>
      <button className={styles.registerButton}>
          <IoTicket className={styles.icon} />
          Pre-Register For 2024
        </button>
    </header>
  );
}
