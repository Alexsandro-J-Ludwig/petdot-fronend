import { Modal } from "@mui/material";
import { useState } from "react";
import AnimalService from "../../../../services/AnimalService";

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

  const nome = name.toLowerCase()
  const confirm = `deletar ${nome}`;

  const deletar = async () => {
    if (valor === confirm) {
      const response = await AnimalService.deleteAnimal(uuid);

      if (response.status == 200) {
        alert("Animal deletado!");
      }
    } else {
        alert("Frase incorreta")
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <img src={imageURL} alt="preview" />
        {name}
      </button>

      <Modal open={open} onClose={handleClose}>
        <div>
          <label>
            Digite "{confirm}" para confirmar
            <input
              onChange={(e) => {
                const valor = e.target.value;
                setValor(valor);
              }}
            />
          </label>

          <button onClick={deletar}>Deletar</button>
        </div>
      </Modal>
    </>
  );
}

export default Confirm;
