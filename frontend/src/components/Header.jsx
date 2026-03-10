import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
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
        alt="logo of 123fakturera"
      />

      <div className={styles.navWrapper}>
        <nav>
          <div ref={mobileNavRef} className={styles.mobileNav}>
            <button
              type="button"
              className={styles.mobileMenuButton}
              aria-label="Toggle navigation"
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
            </div>
          </div>

          <ul className={`${styles.navList} ${styles.desktopNavList}`}>
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
