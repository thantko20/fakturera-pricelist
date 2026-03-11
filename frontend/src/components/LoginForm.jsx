import styles from "./LoginForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  console.log("huh");

  const onSubmit = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <label htmlFor="email">Enter your email address</label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          {...register("username")}
        />
        <p className={styles.inputError}>{errors.username?.message || ""}</p>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Enter your password</label>
        <div className={styles.passwordRow}>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <span className={styles.eyeIcon} aria-hidden="true" />
        </div>
        <p className={styles.inputError}>{errors.password?.message || ""}</p>
      </div>

      <button type="submit">Log in</button>
    </form>
  );
}
