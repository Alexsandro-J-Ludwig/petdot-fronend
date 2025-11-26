import { useState } from "react";
import styles from "./AddShelter.module.css";
import { Modal } from "@mui/material";

function AddShelter() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {};

  return (
    <>
      <button
        onClick={() => {
          handleOpen();
        }}  
      >
        Cadastrar Abrigo
      </button>

      <Modal open={open} onClose={handleClose} aria-labelledby="add-shelter-modal-title">
        <div>
          <h1 className={styles["title"]}>Adicionar Shelter</h1>

          <div className={styles["form"]}>
            <input
              placeholder="Nome fantasia"
              className={styles["field"]}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="CNPJ"
              className={styles["field"]}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <input
              placeholder="Celular"
              className={styles["field"]}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder="Email"
              className={styles["field"]}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className={styles["button"]}>Adicionar</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddShelter;
