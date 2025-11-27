import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import AnimalService from "../../../services/AnimalService";
import Confirm from "./Confirm/Confirm";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function DeleteAnimal({ open, onOpen, onClose }: AddShelterProps) {
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
      // transforma a resposta em um array novo
      const lista = response.data.data.map((item: any) => ({
        uuid: item.uuid,
        name: item.name,
      }));

      setShelters(lista); // apenas um set, limpo e elegante
    }
  };

  const getAnimalByShelter = async (value: string) => {
    const response = await AnimalService.getAnimalByShelter(value);

    if (response.status === 200) {
      const lista = response.data.map((item: any) => ({
        uuid: item.uuid,
        name: item.name,
        imageURL: item.imageURL,
      }));

      setAnimals(lista);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          onOpen();
          getAllShelter();
        }}
      >
        Deletar
      </button>

      {open && (
        <div>
          <h1>Deletar Animal</h1>

          <div>
            <select
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

          <div>
            {animals.map((item: any, index: number) => (
              <div key={index}>
                <Confirm {...item}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAnimal;
