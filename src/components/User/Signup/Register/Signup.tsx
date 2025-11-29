import styles from "./Signup.module.css";
import { useUser } from "../Contexts/UserContext,";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Signup() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
  } = useUser();

  return (
    <div className={styles["container-register"]}>
      <input
        className={styles["field"]}
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles["field"]}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className={styles["field"]}
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className={styles["field"]}
        placeholder="Celular"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>
  );
}

export default Signup;
