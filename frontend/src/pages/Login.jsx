import { Link } from "react-router";
import Header from "../components/Header";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1>Log in</h1>

          <form className={styles.form}>
            <div className={styles.formControl}>
              <label htmlFor="email">Enter your email address</label>
              <input id="email" type="email" placeholder="Email address" />
              <p className={styles.inputError}></p>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Enter your password</label>
              <div className={styles.passwordRow}>
                <input id="password" type="password" placeholder="Password" />
                <span className={styles.eyeIcon} aria-hidden="true" />
              </div>
              <p className={styles.inputError}></p>
            </div>

            <button type="submit">Log in</button>
          </form>

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
