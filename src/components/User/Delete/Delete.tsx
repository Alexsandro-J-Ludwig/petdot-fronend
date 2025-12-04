import { Modal } from "@mui/material";
import { useState } from "react";
import styles from "./Delete.module.css";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import UserService from "@/services/Users/UserServices";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

function Delete() {
  const [open, setOpen] = useState(false);
  const [confirmar, setConfirmar] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (confirmar.toLowerCase() === "deletar conta") {
      const response = await UserService.deleteAccount();

      if (response.status === 200) {
        alert("Conta deletada");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } else {
      triggerSnackbar("A frase está incorreta");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Deletar Conta</h2>

        <div className={styles.warningText}>
          <WarningOutlined /> Cuidado: Esta ação removerá permanentemente sua
          conta e todos os dados associados.
        </div>

        <button className={styles.button} onClick={handleOpen}>
          Deletar Conta <DeleteOutlined />
        </button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={styles.modal}>
          <h2 className={styles.modalTitle}>Confirmar Exclusão</h2>
          <p className={styles.modalText}>
            Você deseja excluir seu usuário? Atenção, essa ação é permanente e
            todos os itens associados a sua conta serão permanentemente
            excluidos!
            <br />
            <br />
            <strong>Escreva: "deletar conta" para confirmar:</strong>
          </p>
          <input
            className={styles.modalInput}
            onChange={(e) => {
              setConfirmar(e.target.value);
            }}
            placeholder='Digite "deletar conta"'
          />

          <button className={styles.button} onClick={handleDelete}>
            DELETAR
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Delete;
