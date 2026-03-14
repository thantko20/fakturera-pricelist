import { Link, Navigate, Outlet } from "react-router";
import {
  BriefcaseIcon,
  CloudArrowUpIcon,
  CreditCardIcon,
  FileTextIcon,
  FilesIcon,
  NotebookIcon,
  PackageIcon,
  SignOutIcon,
  TagIcon,
  TicketIcon,
  UsersIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { useAuth } from "../hooks/use-auth";
import styles from "./MainLayout.module.css";
import HamburgerMenuButton from "../components/HamburgerMenuButton";

const PROFILE_PIC_URL =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const menuItems = [
  {
    key: "invoices",
    label: "Invoices",
    to: "#",
    Icon: FileTextIcon,
    color: "#4bd8fc",
  },
  {
    key: "customers",
    label: "Customers",
    to: "#",
    Icon: UsersIcon,
    color: "#21d1fd",
  },
  {
    key: "my-business",
    label: "My Business",
    to: "#",
    Icon: BriefcaseIcon,
    color: "#30bee6",
  },
  {
    key: "invoice-journal",
    label: "Invoice Journal",
    to: "#",
    Icon: NotebookIcon,
    color: "#30bee6",
  },
  {
    key: "price-list",
    label: "Price List",
    to: "/price-list",
    Icon: TagIcon,
    isActive: true,
    color: "#f78b33",
  },
  {
    key: "multiple-invoicing",
    label: "Multiple Invoicing",
    to: "#",
    Icon: FilesIcon,
    color: "#30bee6",
  },
  {
    key: "unpaid-invoices",
    label: "Unpaid Invoices",
    to: "#",
    Icon: XCircleIcon,
    color: "#e630a0",
  },
  { key: "offer", label: "Offer", to: "#", Icon: TicketIcon, color: "#e7b262" },
  {
    key: "inventory-control",
    label: "Inventory Control",
    to: "#",
    Icon: PackageIcon,
    isMuted: true,
    color: "#30bee6",
  },
  {
    key: "member-invoicing",
    label: "Member invoicing",
    to: "#",
    Icon: CreditCardIcon,
    isMuted: true,
    color: "#0668e9",
  },
  {
    key: "import-export",
    label: "Import/Export",
    to: "#",
    Icon: CloudArrowUpIcon,
    color: "#6d92c2",
  },
  {
    key: "logout",
    label: "Log out",
    to: "#",
    Icon: SignOutIcon,
    color: "#30bee6",
  },
];

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
        <HamburgerMenuButton className={styles.hamburger} onClick={() => {}} />
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
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className={`${styles.navLink} ${item.isMuted ? styles.navLinkMuted : ""}`}
                  >
                    <span
                      className={`${styles.navIndicator} ${item.isActive ? styles.navIndicatorActive : ""}`}
                    ></span>
                    <item.Icon size={16} weight="fill" color={item.color} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
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
