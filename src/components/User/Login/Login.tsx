import { useState } from "react";
import { Modal } from "@mui/material";

import styles from "./Login.module.css";
import UserService from "../../../services/Users/UserServices";

function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    const request = await UserService.login({
      email,
      pass,
    });

    if (request == 200) {
      window.location.href = "/menu";
    }
  };

  return (
    <>
      <button onClick={handleOpen}>Entrar</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles["container-login"]}>
          <h1 className={styles["titulo"]}>Seja bem-vindo de volta!</h1>

          <input
            placeholder="Email"
            className={styles["field"]}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Senha"
            type="password"
            className={styles["field"]}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button
            className={styles["button"]}
            onClick={() => {
              handleLogin();
            }}
          >
            Entrar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Login;
