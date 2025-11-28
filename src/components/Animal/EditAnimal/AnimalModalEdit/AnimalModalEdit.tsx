import { Modal } from "@mui/material";
import { useState } from "react";
import styles from "./AnimalModalEdit.module.css";
import Select from "../../AddAnimal/Select/Select";
import AnimalService from "../../../../services/AnimalService";

type Props = {
  uuid: string;
  name: string;
  imageURL: string;
  birth: string;
  disponible: boolean;
};

function AnimalModalEdit({ uuid, name, imageURL, birth, disponible }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const [names, setname] = useState("");
  const [births, setbirth] = useState("");
  const [species, setspecies] = useState("");
  const [breed, setbreed] = useState("");
  const [gender, setgender] = useState("");
  const [vaccines, setVacines] = useState<string[]>([]);
  const [imageURLs, setImageURL] = useState();

   const getURL = async (f: File) => {
    const extension = f.type;

    const TYPES_ACCEPTED = ["image/png", "image/jpeg", "image/jpg"];

    if (extension && TYPES_ACCEPTED.includes(extension)) {
      const response = await AnimalService.getURL({
        filename: f.name.split(".")[0],
        type: extension,
      });

      if (response.data) {
        const request = await AnimalService.sendImage(
          response.data.uploadURL,
          f
        );

        if (request === 200) {
          console.log("sucesso em enviar imagem");

          setImageURL(response.data.publicURL);

          return true;  
        }
      }
    }

    alert("Formato de imagem não suportado");
    return false;
  };

  const handleUpdate = async () => {
    const response = await AnimalService.editAnimal(uuid, {
      names,
      redemption_date: births,
      species,
      race: breed,
      gender,
      vaccines,
      imageURLs,
    });

    if (response.status === 200) {
        alert("Animal atualizado com sucesso!")
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <img src={imageURL} alt="preview" />
        {name}
        {birth}
        {disponible}
      </button>

      <Modal open={open} onClose={handleClose}>
        <div>
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

          <Select species={species} vacines={vaccines} setVacines={setVacines} />

          <button onClick={handleUpdate}>Atualiaar Animal</button>
        </div>
      </Modal>
    </>
  );
}

export default AnimalModalEdit;
