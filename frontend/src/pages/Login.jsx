import { Link } from "react-router";
import Header from "../components/Header";
import styles from "./Login.module.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1>Log in</h1>
          <LoginForm />
          <div className={styles.metaLinks}>
            <Link to="/register">Register</Link>
            <Link to="/forgot-password">Forgotten password?</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p>123 Fakturera</p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>

        <p className={styles.footerCopy}>
          &copy; Lattfaktura 123, 11638337, 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
