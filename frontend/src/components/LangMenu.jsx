import { useTranslation } from "react-i18next";
import styles from "./LangMenu.module.css";
import { useState, useRef } from "react";
import { useClickOutside } from "../hooks/use-click-outside.js";

const SWEDISH_FLAG_URL = "https://storage.123fakturere.no/public/flags/SE.png";
const ENGLISH_FLAG_URL = "https://storage.123fakturere.no/public/flags/GB.png";

export default function LangMenu() {
  const { t, i18n } = useTranslation();
  const langMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(langMenuRef, () => setIsOpen(false));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className={styles.lang} ref={langMenuRef}>
      <button onClick={() => setIsOpen((open) => !open)}>
        {t("header.language.english")}
        <img
          src={i18n.language === "sv" ? SWEDISH_FLAG_URL : ENGLISH_FLAG_URL}
          alt={t("header.flag.alt")}
        />
      </button>
      <div data-open={isOpen} className={styles.langMenu}>
        <button
          className={styles.langMenuItem}
          onClick={() => changeLanguage("sv")}
        >
          Svenska <img src={SWEDISH_FLAG_URL} alt="Swedish flag" />
        </button>
        <button
          className={styles.langMenuItem}
          onClick={() => changeLanguage("en")}
        >
          English <img src={ENGLISH_FLAG_URL} alt="English flag" />
        </button>
      </div>
    </div>
  );
}
