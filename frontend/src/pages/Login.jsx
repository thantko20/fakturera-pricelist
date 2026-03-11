import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import styles from "./Login.module.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1>{t("login.title")}</h1>
          <LoginForm />
          <div className={styles.metaLinks}>
            <Link to="/register">{t("login.link.register")}</Link>
            <Link to="/forgot-password">{t("login.link.forgotpassword")}</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p>{t("login.footer.brand")}</p>
          <ul>
            <li>
              <Link to="/">{t("login.footer.nav.home")}</Link>
            </li>
            <li>
              <Link to="/order">{t("login.footer.nav.order")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("login.footer.nav.contactus")}</Link>
            </li>
          </ul>
        </div>

        <p className={styles.footerCopy}>{t("login.footer.copyright")}</p>
      </footer>
    </div>
  );
}
