import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    const abortController = new AbortController();
    document.addEventListener("mousedown", listener, {
      signal: abortController.signal,
    });
    document.addEventListener("touchstart", listener, {
      signal: abortController.signal,
    });
    return () => {
      abortController.abort();
    };
  });
}

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const mobileNavListRef = useRef(null);
  const mobileNavRef = useRef(null);
  const [mobileMenuHeight, setMobileMenuHeight] = useState(0);

  useClickOutside(mobileNavRef, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    const updateMenuHeight = () => {
      if (!mobileNavListRef.current) {
        return;
      }

      setMobileMenuHeight(mobileNavListRef.current.scrollHeight);
    };

    updateMenuHeight();
    window.addEventListener("resize", updateMenuHeight);

    return () => {
      window.removeEventListener("resize", updateMenuHeight);
    };
  }, []);

  return (
    <header className={styles.header}>
      <img
        className={styles.logoGem}
        src="https://storage.123fakturera.se/public/icons/diamond.png"
        alt={t("header.logo.alt")}
      />

      <div className={styles.navWrapper}>
        <nav>
          <div ref={mobileNavRef} className={styles.mobileNav}>
            <button
              type="button"
              className={styles.mobileMenuButton}
              aria-label={t("header.mobilemenu.togglearia")}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" />
            </button>

            <div
              data-open={isMobileMenuOpen}
              className={styles.mobileNavMenu}
              style={{ "--mobile-menu-height": `${mobileMenuHeight}px` }}
            >
              <ul ref={mobileNavListRef} className={styles.mobileNavList}>
                <li>
                  <Link to="/">{t("header.nav.home")}</Link>
                </li>
                <li>
                  <Link to="/order">{t("header.nav.order")}</Link>
                </li>
                <li>
                  <Link to="/customers">{t("header.nav.ourcustomers")}</Link>
                </li>
                <li>
                  <Link to="/about">{t("header.nav.aboutus")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("header.nav.contactus")}</Link>
                </li>
              </ul>
            </div>
          </div>

          <ul className={`${styles.navList} ${styles.desktopNavList}`}>
            <li>
              <Link to="/">{t("header.nav.home")}</Link>
            </li>
            <li>
              <Link to="/order">{t("header.nav.order")}</Link>
            </li>
            <li>
              <Link to="/customers">{t("header.nav.ourcustomers")}</Link>
            </li>
            <li>
              <Link to="/about">{t("header.nav.aboutus")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("header.nav.contactus")}</Link>
            </li>
          </ul>
        </nav>

        <span className={styles.lang}>
          {t("header.language.english")}
          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            alt={t("header.flag.alt")}
          />
        </span>
      </div>
    </header>
  );
}
