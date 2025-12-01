import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AnimalService from "../../../../services/AnimalService";
import AdoptionsService from "../../../../services/Adoption";
import { Button, Card } from "antd";
import styles from "./Adoption.module.css";

const { Meta } = Card;

function Adoption() {
  const [animals, setAnimals] = useState(
    [] as {
      uuid: string;
      name: string;
      image: string;
      age: string;
      disponible: boolean;
    }[]
  );

  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [ages, setAge] = useState("");
  const [disponible, setDisponible] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [redemption_date, setRedemption_date] = useState("");
  const [uuidShelter, setUuidShelter] = useState("");

  const [animal, setAnimal] = useState(
    [] as {
      uuid: string;
      name: string;
      images: string;
      age: string;
      disponible: boolean;
      vaccines: string[];
      species: string;
      breed: string;
      gender: string;
      redemption_date: string;
    }[]
  );

  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleAnimals = async () => {
      const response = await AnimalService.getAllAnimals();

      if (response.status === 200) {
        const lista = response.data.map((item: any) => ({
          uuid: item.data.uuid,
          name: item.data.name,
          image: item.data.imageURL,
          age: age(item.data.redemption_date),
          disponible: item.data.disponible === true ? "Sim" : "Não",
          vaccines: item.data.vaccines,
        }));

        setAnimals(lista);
      }
    };

    handleAnimals();
  }, []);

  const getAnimal = async (uuid: string) => {
    const response = await AnimalService.getAnimal(uuid);

    if (response.data) {
      setUuid(response.data.data.uuid);
      setName(response.data.data.name);
      setImages(response.data.data.imageURL);
      setAge(age(response.data.data.redemption_date));
      setDisponible(response.data.data.disponible === true ? "Sim" : "Não");
      setVaccines(response.data.data.vaccines);
      setSpecies(response.data.data.species);
      setBreed(response.data.data.race);
      setGender(response.data.data.gender);
      setRedemption_date(response.data.data.redemption_date);
      setUuidShelter(response.data.data.uuid_shelter);
    }
  };

  const age = (date: string) => {
    const a = new Date(date);
    const b = new Date();

    let anos = b.getFullYear() - a.getFullYear();
    let meses = b.getMonth() - a.getMonth();

    // Ajuste caso o mês final seja menor que o inicial
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    // Ajuste se quiser considerar também o dia
    if (b.getDate() < a.getDate()) {
      meses--;

      if (meses < 0) {
        anos--;
        meses += 12;
      }
    }

    return `${
      anos === 0 ? "" : anos === 1 ? `${anos} ano e` : `${anos} anos e`
    } ${meses} ${meses === 1 ? "mes" : "meses"}`;
  };

  const adotar = async () => {
    const response = await AdoptionsService.register({
      uuid,
      uuidShelter,
    });

    if (response.status === 201) {
      alert("Adotou com sucesso!");
      desableAnimal();
    }
  };

  const desableAnimal = async () => {
    const response = await AnimalService.editAnimal(uuid, {
      disponible: false,
    });

    if (response.status === 200) {
      console.log("Animal desabilitado com sucesso!");
    }
  };

  return (
    <>
      <div className={styles["navbar"]}>
        <select onChange={(e) => setSpeciesFilter(e.target.value)}>
          <option value="all">Todos os animais</option>
          <option value="dogs">Cachorros</option>
          <option value="cats">Gatos</option>
        </select>

        <select >
          <option value="age">Idade</option>
          <option value="young">Jovens</option>
          <option value="adult">Adultos</option>
          <option value="elderly">Idosos</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por nome"
          className={styles["search"]}
        />
      </div>

      <div className={styles["cardsContainer"]}>
        {animals.map((item: any, indice: number) => (
          <div key={indice} className={styles["animal-card"]}>
            <Card
              hoverable
              style={{ width: 270, height: 550 }}
              cover={
                <img
                  draggable={false}
                  alt="preview"
                  src={item.image}
                  width={200}
                  height={330}
                />
              }
              className={styles["card"]}
            >
              <Meta title={item.name} />

              <div className={styles["age-container"]}>
                <h3>Idade:</h3>
                <h3 className={styles["age"]}>{item.age}</h3>
              </div>

              <div className={styles["disponible-container"]}>
                <span>
                  dispoível: <p>{item.disponible}</p>
                </span>
              </div>

              {item.disponible === "Sim" && (
                <Button
                  onClick={() => {
                    handleOpen();
                    getAnimal(item.uuid);
                  }}
                >
                  Adotar
                </Button>
              )}
            </Card>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <div>
          <img src={images} alt="preview" />

          <h2>{name}</h2>

          <h3>Data de nascimento:</h3>
          <p>
            {redemption_date} - {ages}
          </p>

          <h3>Especie:</h3>
          <p>{species}</p>

          <h3>Raça:</h3>
          <p>{breed}</p>

          <h3>Genero:</h3>
          <p>{gender}</p>

          <h3>Vacinas:</h3>
          <p>{vaccines.join(", ")}</p>

          <button onClick={adotar}>Adotar</button>
        </div>
      </Modal>
    </>
  );
}

export default Adoption;
