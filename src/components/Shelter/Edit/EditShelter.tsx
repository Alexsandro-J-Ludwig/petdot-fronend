import { Modal } from "@mui/material";
import { useState } from "react";

function EditShelter() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => {
          handleOpen();
        }}
      >
        Editar Abrigo
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-shelter-modal-title"
      >
        <div>
          <input placeholder="Nome Fantasia" />
          <input placeholder="CNPJ" />
          <input placeholder="Celular" />
          <input placeholder="Email" />
        </div>
      </Modal>
    </>
  );
}

export default EditShelter;
