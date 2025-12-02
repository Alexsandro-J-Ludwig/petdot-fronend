import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import AnimalService from "../../../services/AnimalService";
import AnimalModalEdit from "./AnimalModalEdit/AnimalModalEdit";
import styles from "./EditAnimal.module.css";
import { SearchOutlined } from "@ant-design/icons";

function EditAnimal() {
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
        uuid: item.uuid,
        name: item.name,
        imageURL: item.imageURL,
        birth: item.redemption_date,
        disponible: item.disponible,
      }));

      setAnimals(lista);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Editar Animal</h2>

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
              <AnimalModalEdit {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditAnimal;
