import { Link } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <img
        className={styles.logoGem}
        src="https://storage.123fakturera.se/public/icons/diamond.png"
        alt="logo of 123fakturera"
      />

      <div className={styles.navWrapper}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/customers">Our Customers</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <span className={styles.lang}>
          English
          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            alt="flag of great britain"
          />
        </span>
      </div>
    </header>
  );
}
