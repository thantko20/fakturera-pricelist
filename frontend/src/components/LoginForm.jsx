import styles from "./LoginForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

const PasswordInput = ({ register }) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onTogglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible);
  };

  return (
    <div className={styles.passwordRow}>
      <input
        id="password"
        type={isPasswordVisible ? "text" : "password"}
        placeholder={t("login.form.placeholder.password")}
        {...register("password")}
      />
      <button
        type="button"
        className={styles.showPasswordButton}
        onClick={onTogglePasswordVisibility}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
      >
        {isPasswordVisible ? (
          <EyeSlashIcon size={20} weight="fill" />
        ) : (
          <EyeIcon size={20} weight="fill" />
        )}
      </button>
    </div>
  );
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setAuthFromLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post("/auth/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      const authData = data?.accessToken || {};
      setAuthFromLogin({
        accessToken: authData.accessToken,
      });
      navigate("/price-list");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response.data?.error?.message ?? "Login failed");
        return;
      }
      toast.error("Unknown error");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <label htmlFor="email">{t("login.form.label.email")}</label>
        <input
          id="email"
          type="email"
          placeholder={t("login.form.placeholder.email")}
          {...register("email")}
        />
        <p className={styles.inputError}>{t(errors.email?.message || "")}</p>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">{t("login.form.label.password")}</label>
        <PasswordInput register={register} />
        <p className={styles.inputError}>{t(errors.password?.message || "")}</p>
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Loading..." : t("login.form.submit")}
      </button>
    </form>
  );
}
