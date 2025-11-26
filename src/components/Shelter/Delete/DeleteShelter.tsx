import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import styles from "./DeleteShelter.module.css";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function DeleteShelter({ open, onOpen, onClose }: AddShelterProps) {
  const [uuid, setUuid] = useState("");

  const [shelters, setShelters] = useState(
    [] as { uuid: string; name: string }[]
  );

  useEffect(() => {
    getAllShelter();
  }, []);

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

  const handleDelete = async () => {
    const response = await ShelterService.deleteShelter(uuid);

    if (response === 200) {
      alert("Abrigo deletado");
      window.location.reload
    }
  };

  return (
    <>
      <button onClick={onOpen}>Deletar Abrigo</button>

      {open && (
        <div className={styles["container-delete"]}>
          <div>
            <select
              className={styles["field"]}
              onChange={(e) => {
                setUuid(e.target.value);
              }}
            >
              <option value="">Selecione um abrigo</option>
              {shelters.map((item: any, index: number) => (
                <option key={index} value={item.uuid}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button className={styles["deletar"]} onClick={handleDelete}>
            Deletar Abrigo
          </button>
        </div>
      )}
    </>
  );
}

export default DeleteShelter;
