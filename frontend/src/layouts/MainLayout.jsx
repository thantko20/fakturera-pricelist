import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";
import styles from "./MainLayout.module.css";

const PROFILE_PIC_URL =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function MainLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();
  console.log("MainLayout - isAuthenticated:", isAuthenticated);

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.profilePictureWrapper}>
            <img
              src={PROFILE_PIC_URL}
              alt="john doe"
              className={styles.profileImage}
            />
            <div className={styles.profileIndicator}></div>
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>John Doe</span>
            <span className={styles.profileNameSubtext}>Storjord AS</span>
          </div>
        </div>

        <div className={styles.languageSwitcher}>
          <span className={styles.languageName}>Norsk Bokmal</span>
          <span className={styles.languageFlag}></span>
        </div>
      </header>
      {/* body wrapper */}
      <div className={styles.body}>
        {/* sidebar */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Menu</p>
          <nav className={styles.sidebarNav}>
            <ul>
              <li>
                <Link to="/price-list">Price List</Link>
              </li>
            </ul>
          </nav>
        </aside>
        {/* main content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
