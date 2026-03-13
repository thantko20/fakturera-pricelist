import styles from "./HamburgerMenuButton.module.css";

export default function HamburgerMenuButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.hamburgerButton} ${className}`}
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  );
}
