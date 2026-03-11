import { useTranslation } from "react-i18next";
import styles from "./LangMenu.module.css";

export default function LangMenu() {
  const { t } = useTranslation();
  return (
    <button className={styles.lang}>
      {t("header.language.english")}
      <img
        src="https://storage.123fakturere.no/public/flags/GB.png"
        alt={t("header.flag.alt")}
      />
    </button>
  );
}
