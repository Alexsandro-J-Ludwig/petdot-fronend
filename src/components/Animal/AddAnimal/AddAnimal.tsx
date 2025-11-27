import { useState } from "react";
import Select from "./Select/Select";

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
  const [vacines, setvacines] = useState([]);
  const [description, setdescription] = useState("");

  const addAnimal = async () => {
  }

  return (
    <>
      <h1>Adicionar Animal</h1>

      <button onClick={onOpen}>Adicionar</button>

      {open && (
        <div>
          <div>
            {files && <p>{files[0].name}</p>}
            <input
              type="file"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
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

          <input
            placeholder="Espécie"
            onChange={(e) => {
              setspecies(e.target.value);
            }}
          />
          <input
            placeholder="Raça"
            onChange={(e) => {
              setbreed(e.target.value);
            }}
          />
          <input
            placeholder="Genero"
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <Select specie={species}/>
          <textarea
            placeholder="Descrição"
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default AddAnimal;
