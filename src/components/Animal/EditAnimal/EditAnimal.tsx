import { useEffect, useState } from "react";
import Nav from "../../Recicle/Nav/Nav";
import ShelterService from "../../../services/ShelterService";
import AnimalService from "../../../services/AnimalService";
import AnimalModalEdit from "./AnimalModalEdit/AnimalModalEdit";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function EditAnimal({ open, onOpen, onClose }: AddShelterProps) {
  const [shelters, setShelters] = useState(
    [] as { uuid: string; name: string }[]
  );
  const [animals, setAnimals] = useState(
    [] as { uuid: string; name: string }[]
  );
  //UseEffect para pegar todos os abrigos
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
        birth: item.redemption_date,
        disponible: item.disponible,
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
        Editar
      </button>

      {open && (
        <div>
          <h1>Editar Animal</h1>

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
                <AnimalModalEdit {...item}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default EditAnimal;
