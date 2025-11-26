import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import styles from "./EditShelter.module.css";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function EditShelter({ open, onOpen, onClose }: AddShelterProps) {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");

  const [shelters, setShelters] = useState(
    [] as { uuid: string; name: string }[]
  );

  useEffect(() => {
    getAllShelter()
  }, [])

  const getAllShelter = async () => {
    const uuid = localStorage.getItem("token") || "";
    const response = await ShelterService.getAllShelter(uuid);     

    if (response.data) {
      // transforma a resposta em um array novo
      const lista = response.data.data.map((item: any) => ({
        uuid: item.uuid,
        name: item.name,
      }));

      setShelters(lista); // apenas um set, limpo e elegante
    }
  };

  const handleEdit = async () => {    
    const response = await ShelterService.editShelter(uuid, {
      name: name,
      cnpj: cnpj,
      phone: phone,
      email: email,
    });

    if (response === 200) {
      alert("Abrigo editado com sucesso!");
    } else {
      alert("Erro ao editar abrigo");
    }
  };

  return (
    <>
      <button onClick={() => { onOpen(); getAllShelter(); }}>Editar Abrigo</button>

      {open && (
        <div>
          <div>
            <select 
            className={styles["field"]}
            onChange={(e) => {
              setUuid(e.target.value)
            }}>
              <option value="">Selecione um abrigo</option>
              {shelters.map((item: any, index: number) => (
                <option key={index} value={item.uuid}>{item.name}</option>
              ))}
            </select>
          </div>

          <input
            placeholder="Nome Fantasia"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="CNPJ"
            onChange={(e) => {
              setCnpj(e.target.value);
            }}
          />
          <input
            placeholder="Celular"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <button onClick={handleEdit}>Salvar</button>
        </div>
      )}
    </>
  );
}

export default EditShelter;
