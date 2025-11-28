import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AnimalService from "../../../../services/AnimalService"; 
import AdoptionsService from "../../../../services/Adoption";

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
  const [disponible, setDisponible] = useState(false);
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleAnimals = async () => {
      const response = await AnimalService.getAllAnimals();

      if (response.status === 200) {
        const lista = response.data.map((item: any) => ({
          uuid: item.uuid,
          name: item.name,
          image: item.imageURL,
          age: age(item.redemption_date),
          disponible: item.disponible,
          vaccines: item.vaccines,
        }));

        setAnimals(lista);
      }
    };

    handleAnimals();
  }, []);

  const getAnimal = async (uuid: string) => {
    const response = await AnimalService.getAnimal(uuid);

    console.log(response.data);
    
    if (response.data) {
      setUuid(response.data.uuid);
      setName(response.data.name);
      setImages(response.data.imageURL);
      setAge(age(response.data.redemption_date));
      setDisponible(response.data.disponible);
      setVaccines(response.data.vaccines);
      setSpecies(response.data.species);
      setBreed(response.data.race);
      setGender(response.data.gender);
      setRedemption_date(response.data.redemption_date);
      setUuidShelter(response.data.uuid_shelter);
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
        uuidShelter
    })

    if(response.status === 201) {
        alert("Adotou com sucesso!")
        desableAnimal()
    }
  }

  const desableAnimal = async () => {
    const response = await AnimalService.editAnimal(uuid, {
      disponible: false,
    });

    if (response.status === 200) {
        console.log("Animal desabilitado com sucesso!");
  }
}

  return (
    <>
      {animals.map((item: any, indice: number) => (
        <div key={indice}>
          <button
            onClick={() => {
              handleOpen();
              getAnimal(item.uuid);
            }}
          >
            <img src={item.image} alt="preview" />
            {item.name}
            {item.age}
            {item.disponible}
          </button>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <div>
          <img src={images} alt="preview" />

          <h2>{name}</h2>
          <p>
            Data de nascimento: {redemption_date} - {ages}
          </p>

          <p>
            Especie: {species} - Raça: {breed} - Genero: {gender}
          </p>

            <button onClick={adotar}>Adotar</button>
        </div>
      </Modal>
    </>
  );
}

export default Adoption;
