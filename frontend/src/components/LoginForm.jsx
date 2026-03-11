import styles from "./LoginForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <label htmlFor="email">{t("login.form.label.email")}</label>
        <input
          id="email"
          type="email"
          placeholder={t("login.form.placeholder.email")}
          {...register("username")}
        />
        <p className={styles.inputError}>{t(errors.username?.message || "")}</p>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">{t("login.form.label.password")}</label>
        <div className={styles.passwordRow}>
          <input
            id="password"
            type="password"
            placeholder={t("login.form.placeholder.password")}
            {...register("password")}
          />
          <span className={styles.eyeIcon} aria-hidden="true" />
        </div>
        <p className={styles.inputError}>{t(errors.password?.message || "")}</p>
      </div>

      <button type="submit">{t("login.form.submit")}</button>
    </form>
  );
}
