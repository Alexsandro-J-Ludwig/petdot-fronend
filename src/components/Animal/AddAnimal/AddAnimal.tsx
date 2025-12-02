import { useEffect, useState } from "react";
import Select from "./Select/Select";
import styles from "./AddAnimal.module.css";
import Nav from "../../Recicle/Nav/Nav";
import AnimalService from "../../../services/AnimalService";
import ShelterService from "../../../services/ShelterService";

type AddShelterProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function AddAnimal({ open, onOpen, onClose }: AddShelterProps) {
  const [files, setFiles] = useState<FileList | null>(null);

  const [name, setname] = useState("");
  const [birth, setbirth] = useState("");
  const [species, setspecies] = useState("");
  const [breed, setbreed] = useState("");
  const [gender, setgender] = useState("");
  const [vaccines, setVacines] = useState<string[]>([]);
  const [shelterUUID, setShelterUUID] = useState("");

  const [shelters, setShelters] = useState(
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

  const getURL = async (f: File) => {
    const extension = f.type;

    const TYPES_ACCEPTED = ["image/png", "image/jpeg", "image/jpg"];

    if (extension && TYPES_ACCEPTED.includes(extension)) {
      const response = await AnimalService.getURL({
        filename: f.name.split(".")[0],
        type: extension,
      });

      if (response.data) {
        console.log(response.data);

        const request = await AnimalService.sendImage(
          response.data.data.uploadURL,
          f
        );

        if (request === 200) {
          console.log("sucesso em enviar imagem");

          return response.data.data.publicURL;
        }
      }
    }

    alert("Formato de imagem não suportado");
    return false;
  };

  //Pegar a url de imagem para salvar e guardar a url public de imagem

  const addAnimal = async (url: string) => {
    const response = await AnimalService.addAnimal({
      name,
      birth,
      species,
      breed,
      gender,
      vaccines,
      shelterUUID,
      url,
    });

    if (response.status == 201) {
      alert("Animal criado com sucesso!");
    }
  };

  const handleClick = async () => {
    let url = "";
    if (files && files.length > 0) {
      url = await getURL(files[0]);
    } else {
      // Se a URL não foi obtida, para a execução, pois o alert já foi chamado no getURL
      return;
    }

    addAnimal(url);
  };

  return (
    <>
      <Nav />
      <button
        onClick={() => {
          onOpen();
          getAllShelter();
        }}
      >
        Adicionar
      </button>

      {open && (
        <div>
          <h1>Adicionar Animal</h1>

          <div>
            <select
              className={styles["field"]}
              onChange={(e) => {
                setShelterUUID(e.target.value);
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
            {files && <img src={URL.createObjectURL(files[0])} alt="preview" />}
            {!files && (
              <input
                className={styles["image-input"]}
                type="file"
                onChange={(e) => {
                  const f = e.target.files;
                  setFiles(f);
                }}
              />
            )}
          </div>
          <input
            placeholder="Nome"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            placeholder="Nascimento"
            type="date"
            onChange={(e) => {
              setbirth(e.target.value);
            }}
          />

          <select
            onChange={(e) => {
              setspecies(e.target.value);
            }}
          >
            <option value="">Espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Pássaro">Pássaro</option>
            <option value="Coelho">Coelho</option>
          </select>
          <input
            placeholder="Raça"
            onChange={(e) => {
              setbreed(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              setgender(e.target.value);
            }}
          >
            <option value="">Gênero</option>
            <option value="male">Macho</option>
            <option value="female">Fêmea</option>
          </select>

          <Select
            species={species}
            vacines={vaccines}
            setVacines={setVacines}
          />

          <button onClick={handleClick}>Cadastrar Animal</button>
        </div>
      )}
    </>
  );
}

export default AddAnimal;
