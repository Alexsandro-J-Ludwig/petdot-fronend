import { Modal } from "@mui/material";
import { useState } from "react";
import AnimalService from "../../../../services/AnimalService";
import styles from "./Confirm.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

type Props = {
  uuid: string;
  name: string;
  imageURL: string;
};

function Confirm({ uuid, name, imageURL }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [valor, setValor] = useState("");

  const confirm = `deletar ${name}`;

  const deletar = async () => {
    if (valor === confirm) {
      const response = await AnimalService.deleteAnimal(uuid);

      if (response.status == 200) {
        alert("Animal deletado!");
        window.location.reload();
      }
    } else {
      triggerSnackbar("Frase incorreta");
    }
  };

  return (
    <>
      <button className={styles.triggerButton} onClick={handleOpen}>
        <img src={imageURL} alt={name} className={styles.animalImage} />
        <div className={styles.animalInfo}>
          <span className={styles.animalName}>{name}</span>
        </div>
        <DeleteOutlined style={{ marginLeft: "auto", color: "#d32f2f" }} />
      </button>

      <Modal open={open} onClose={handleClose}>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>Confirmar Exclusão</h2>

          <label className={styles.label}>
            Digite <strong>"{confirm}"</strong> para confirmar
            <div className={styles.inputWrapper}>
              <input
                className={styles.field}
                onChange={(e) => {
                  const valor = e.target.value;
                  setValor(valor);
                }}
                placeholder={`Digite "${confirm}"`}
              />
            </div>
          </label>

          <button className={styles.button} onClick={deletar}>
            Deletar Permanentemente <DeleteOutlined />
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Confirm;
