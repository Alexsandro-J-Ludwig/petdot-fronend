import { useState } from "react";

import styles from "./Signup.module.css";
import UserService from "../../../../services/Users/UserServices";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Signup({ setStepper }: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleUser = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ) => {
    const response = await UserService.registerUser({
      name,
      email,
      pass: password,
      celular: phone,
    });

    if (response == 201) {
      setStepper(1);
    }
  };

  const handleRegisterClick = async () => {
    if (!name || !email || !password || !phone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    await handleUser(name, email, password, phone);
  };

  return (
    <div className={styles["container-register"]}>
      <input
        className={styles["field"]}
        placeholder="Nome"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className={styles["field"]}
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className={styles["field"]}
        placeholder="Senha"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        className={styles["field"]}
        placeholder="Celular"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <button
        className={styles["button"]}
        onClick={handleRegisterClick}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default Signup;
