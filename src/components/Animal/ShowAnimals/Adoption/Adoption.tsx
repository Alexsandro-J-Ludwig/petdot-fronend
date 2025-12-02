import { Box, CircularProgress, debounce, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AnimalService from "../../../../services/AnimalService";
import AdoptionsService from "../../../../services/Adoption";
import { Card } from "antd";
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

  const [visible, setVisible] = useState(false);

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
  const [disponibleFilter, setDisponibleFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    handleAnimals().then(() => {
      setTimeout(() => setVisible(true), 50);
    });
  }, []);

  const handleAnimals = async (value = search) => {
    setLoadding(true)
    const response = await AnimalService.getAllAnimals();

    if (response.status === 200) {
      const lista = response.data
        .filter((item: any) => {
          const matchSearch = item.data.name
            .toLowerCase()
            // .includes(search.toLowerCase());
            .includes(value.toLowerCase());

          if (speciesFilter === "all") {
            return matchSearch;
          }

          if (speciesFilter === "dogs") {
            return matchSearch && item.data.species === "Cachorro";
          }

          if (speciesFilter === "cats") {
            return matchSearch && item.data.species === "Gato";
          }

          if (disponibleFilter === "all") {
            return matchSearch;
          }

          if (disponibleFilter === "true") {
            return matchSearch && item.data.disponible === true;
          }

          if (disponibleFilter === "false") {
            return matchSearch && item.data.disponible === false;
          }

          return matchSearch;
        })
        .map((item: any) => ({
          uuid: item.data.uuid,
          name: item.data.name,
          image: item.data.imageURL,
          age: age(item.data.redemption_date),
          species: item.data.species,
          disponible: item.data.disponible === true ? "Sim" : "Não",
          vaccines: item.data.vaccines,
        }));

      lista.sort((a: any, b: any) => {
        if (
          a.name.toLowerCase() < b.name.toLowerCase() &&
          a.disponible !== "Não" &&
          b.disponible !== "Não"
        )
          return -1;
        if (
          a.name.toLowerCase() > b.name.toLowerCase() &&
          a.disponible !== "Não" &&
          b.disponible !== "Não"
        )
          return 1;

        if (a.disponible === "Sim" && b.disponible === "Não") return -1;
        if (b.disponible === "Não" && b.disponible === "Sim") return 1;
        return 0;
      });

      setAnimals(lista);
      setLoadding(false)
    }
  };

  const getAnimal = async (uuid: string) => {
    setLoadding(true);
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

    setLoadding(false);
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
    setLoadding(true);
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
      setLoadding(false);
      window.location.reload();
    }
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      handleAnimals(value);
    }, 500)
  ).current;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    console.log(search);

    debouncedSearch(value);
  };

  return (
    <>
      <div className={styles["navbar"]}>
        <select
          className={styles["select-species"]}
          onChange={(e) => {
            const value = e.target.value;
            setSpeciesFilter(value);
            handleAnimals();
          }}
        >
          <option value="all">Todos</option>
          <option value="dogs">Cachorros</option>
          <option value="cats">Gatos</option>
        </select>

        <select
          onChange={(e) => setDisponibleFilter(e.target.value)}
          className={styles["select-disponible"]}
        >
          <option value="all">Dispinível</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por nome"
          className={styles["search"]}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles["cardsContainer"]}>
        {!loadding && (
          <>
            {animals.map((item: any, indice: number) => (
              <div
                key={indice}
                className={`${styles["animal-card"]} ${
                  visible ? styles["cardsContainerShow"] : ""
                }`}
                style={{
                  transitionDelay: `${indice * 20}ms`,
                }}
              >
                <Card
                  hoverable
                  style={
                    item.disponible === "Sim"
                      ? { width: 270, height: 550 }
                      : { backgroundColor: "gray", width: 270, height: 550 }
                  }
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
                  <Meta style={{ color: "#5d4037" }} title={item.name} />

                  <div className={styles["age-container"]}>
                    <h3 style={{ color: "#5d4037" }}>Idade:</h3>
                    <h3 style={{ color: "#5d4037" }} className={styles["age"]}>
                      {item.age}
                    </h3>
                  </div>

                  <div className={styles["disponible-container"]}>
                    <span style={{ color: "#5d4037" }}>
                      dispoível: <p>{item.disponible}</p>
                    </span>
                  </div>

                  {item.disponible === "Sim" && (
                    <button
                      className={styles["adopt-button"]}
                      onClick={() => {
                        handleOpen();
                        getAnimal(item.uuid);
                      }}
                    >
                      Adotar
                    </button>
                  )}
                </Card>
              </div>
            ))}
          </>
        )}

        {loadding && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={styles["modal"]}>
          {!loadding && (
            <>
              <div className={styles["modalHeader"]}>
                <h2 className={styles["modalTitle"]}>{name}</h2>
              </div>

              <img className={styles["preview"]} src={images} alt="preview" />

              <div className={styles["grid"]}>
                <div className={styles["fieldGroup"]}>
                  <label className={styles["label"]}>Data de nascimento</label>
                  <p className={styles["value"]}>
                    {redemption_date} - {ages}
                  </p>
                </div>

                <div className={styles["fieldGroup"]}>
                  <label className={styles["label"]}>Especie</label>
                  <p className={styles["value"]}>{species}</p>
                </div>

                <div className={styles["fieldGroup"]}>
                  <label className={styles["label"]}>Raça</label>
                  <p className={styles["value"]}>{breed}</p>
                </div>

                <div className={styles["fieldGroup"]}>
                  <label className={styles["label"]}>Genero</label>
                  <p className={styles["value"]}>{gender}</p>
                </div>

                <div className={styles["fieldGroup"]}>
                  <label className={styles["label"]}>Vacinas</label>
                  <p className={styles["value"]}>{vaccines.join(", ")}</p>
                </div>
              </div>

              <button className={styles["confirmButton"]} onClick={adotar}>
                Adotar
              </button>
            </>
          )}

          {loadding && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Adoption;
