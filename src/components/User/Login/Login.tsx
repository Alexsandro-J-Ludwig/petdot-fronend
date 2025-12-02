import { useState } from "react";
import { Box, CircularProgress, Modal } from "@mui/material";

import styles from "./Login.module.css";
import UserService from "../../../services/Users/UserServices";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

function Login() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [loadding, setLoadding] = useState(false);

  const handleLogin = async () => {
    if (email === "" || pass === "") {
      triggerSnackbar("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      triggerSnackbar("Por favor, insira um email válido.");
      return;
    }

    setLoadding(true);

    const request = await UserService.login({
      email,
      pass,
    });

    if (request == 200) {
      window.location.href = "/menu";
    } else {
      triggerSnackbar("Email ou senha incorretos.");
      setLoadding(false);
    }
  };

  return (
    <>
      <button onClick={handleOpen} className={styles["button"]}>
        Entrar
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles["container-login"]}>
          {!loadding && (
            <>
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
            </>
          )}

          {loadding && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Login;
