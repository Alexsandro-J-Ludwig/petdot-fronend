import { Modal } from "@mui/material";
import { useState } from "react";

function DeleteShelter() {
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
        Cadastrar Abrigo
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-shelter-modal-title"
      >
        <div></div>
      </Modal>
    </>
  );
}

export default DeleteShelter;
