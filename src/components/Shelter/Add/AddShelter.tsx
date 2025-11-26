import { useState } from "react";
import styles from "./AddShelter.module.css";
import AddressService from "../../../services/AddressService";
import ShelterService from "../../../services/ShelterService";
import UserService from "../../../services/Users/UserServices";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function AddShelter({ open, onOpen, onClose }: AddShelterProps) {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleAddress = async () => {
    // Lógica para pegar o enderenco do usuário e setar o uuid_address no abrigo
    const response = await AddressService.getAddress(
      localStorage.getItem("token") || ""
    );

    if (response.data.uuid) {
      setAddress(response.data.uuid);
      handleAddShelter();
    } else {
      alert("Erro ao cadastrar endereço");
    }
  };

  const handleAddShelter = async () => {
    const request = await ShelterService.addShelter({
      name: name,
      cnpj: cnpj,
      uuid_address: address,
      phone: phone,
      email: email,
    });

    if (request.status === 201) {
      alterAccess();
    } else {
      alert("Erro ao cadastrar abrigo");
    }
  };

  const alterAccess = async () => {
    const response = await UserService.updateUser({ nivel_acesso: 2 });

    if (response === 200) {
      alert("Nível de acesso alterado com sucesso!");
    } else {
      alert("Erro ao alterar o nível de acesso");
    }
  };

  return (
    <>
      <button onClick={onOpen}>Cadastrar Abrigo</button>

      {open && (
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

            <button className={styles["button"]} onClick={handleAddress}>
              Adicionar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddShelter;
