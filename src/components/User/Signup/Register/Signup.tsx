import styles from "./Signup.module.css";
import { useUser } from "../Contexts/UserContext,";
import { ArrowRightOutlined } from "@ant-design/icons";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Signup({ setStepper }: Props) {
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

  const validation = () => {
    if (!name || !email || !password) {
      triggerSnackbar("Por favor, preencha todos os campos antes de avançar.");
      return;
    }

    const valdiationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valdiationEmail) {
      triggerSnackbar("Por favor, insira um email válido.");
      return;
    }

    if (phone.length < 10) {
      triggerSnackbar("Por favor, insira um número de celular válido.");
      return;
    }

    if (password.length < 8) {
      triggerSnackbar("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password.length > 50) {
      triggerSnackbar("A senha não pode exceder 50 caracteres.");
      return;
    }

    setStepper(1);
  };

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
        min={8}
        max={50}
      />
      <input
        className={styles["field"]}
        placeholder="Celular"
        value={phone}
        onChange={(e) => {
          let v = e.target.value.replace(/\D/g, ""); // tira tudo que não é número

          if (v.length >= 2) {
            v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
          }

          if (v.length >= 10) {
            v = `${v.slice(0, 10)}-${v.slice(10, 14)}`;
          }

          setPhone(v);
        }}
        maxLength={15}
        required
      />

      <button
        className={styles["next-button"]}
        onClick={() => {
          validation();
        }}
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
}

export default Signup;
