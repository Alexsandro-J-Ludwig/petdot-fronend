import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import AnimalService from "../../../services/AnimalService";
import Confirm from "./Confirm/Confirm";
import styles from "./DeleteAnimal.module.css";
import { SearchOutlined, WarningOutlined } from "@ant-design/icons";

function DeleteAnimal() {
  const [shelters, setShelters] = useState(
    [] as { uuid: string; name: string }[]
  );
  const [animals, setAnimals] = useState(
    [] as { uuid: string; name: string }[]
  );

  useEffect(() => {
    getAllShelter();
  }, []);

  const getAllShelter = async () => {
    const uuid = localStorage.getItem("token") || "";
    const response = await ShelterService.getAllShelter(uuid);

    if (response.data) {
      const lista = response.data.data.map((item: any) => ({
        uuid: item.uuid,
        name: item.name,
      }));

      setShelters(lista);
    }
  };

  const getAnimalByShelter = async (value: string) => {
    const response = await AnimalService.getAnimalByShelter(value);

    if (response.status === 200) {
      const lista = response.data.map((item: any) => ({
        uuid: item.data.uuid,
        name: item.data.name,
        imageURL: item.data.imageURL,
      }));

      setAnimals(lista);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Deletar Animal</h2>

        <div className={styles.warningText}>
          <WarningOutlined /> Cuidado: Esta ação removerá permanentemente o animal.
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Selecionar Abrigo</label>
          <div className={styles.inputWrapper}>
            <SearchOutlined className={styles.icon} />
            <select
              className={`${styles.field} ${styles.select}`}
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  getAnimalByShelter(value);
                }
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
        </div>

        <div className={styles.animalList}>
          {animals.map((item: any, index: number) => (
            <div key={index}>
              <Confirm
                uuid={item.uuid}
                name={item.name}
                imageURL={item.imageURL}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeleteAnimal;
