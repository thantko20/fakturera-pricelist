import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        {/* profile section */}
        <div>
          {/* profile picture */}
          <div>
            {/* img */}
            <img />
            {/* indicator */}
            <span></span>
          </div>
        </div>

        {/* language menu */}
        <div>
          <span>Norsk Bokmal</span>
          {/* flag */}
          <img />
        </div>
      </header>
      {/* body wrapper */}
      <div className={styles.body}>
        {/* sidebar */}
        <aside className={styles.sidebar}></aside>
        {/* main content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
