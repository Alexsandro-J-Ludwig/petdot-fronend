import { useEffect, useState } from "react";
import Select from "./Select/Select";
import styles from "./AddAnimal.module.css";
import AnimalService from "../../../services/AnimalService";
import ShelterService from "../../../services/ShelterService";
import {
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function AddAnimal() {
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
          response.data.data.uploadURL,
          f
        );

        if (request === 200) {
          return response.data.data.publicURL;
        }
      }
    }

    alert("Formato de imagem não suportado");
    return false;
  };

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
      return;
    }

    addAnimal(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Adicionar Animal</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Abrigo</label>
          <div className={styles.inputWrapper}>
            <SearchOutlined className={styles.icon} />
            <select
              className={`${styles.field} ${styles.select}`}
              onChange={(e) => {
                setShelterUUID(e.target.value);
              }}
              value={shelterUUID}
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

        <div className={styles.inputGroup}>
          <label className={styles.label}>Foto do Animal</label>
          {files && (
            <img
              src={URL.createObjectURL(files[0])}
              alt="preview"
              className={styles.imagePreview}
            />
          )}
          <label className={styles.fileInputLabel}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files;
                setFiles(f);
              }}
            />
            <UploadOutlined style={{ marginRight: "0.5rem" }} />
            {files ? "Trocar Imagem" : "Escolher Imagem"}
          </label>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome</label>
            <div className={styles.inputWrapper}>
              <UserOutlined className={styles.icon} />
              <input
                placeholder="Nome do Animal"
                className={styles.field}
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Nascimento</label>
            <div className={styles.inputWrapper}>
              <CalendarOutlined className={styles.icon} />
              <input
                placeholder="Nascimento"
                type="date"
                className={styles.field}
                onChange={(e) => setbirth(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Espécie</label>
            <div className={styles.inputWrapper}>
              <select
                className={`${styles.field} ${styles.select}`}
                onChange={(e) => setspecies(e.target.value)}
                value={species}
              >
                <option value="">Selecione</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Pássaro">Pássaro</option>
                <option value="Coelho">Coelho</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Raça</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Raça"
                className={styles.field}
                value={breed}
                onChange={(e) => setbreed(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Gênero</label>
            <div className={styles.inputWrapper}>
              <select
                className={`${styles.field} ${styles.select}`}
                onChange={(e) => setgender(e.target.value)}
                value={gender}
              >
                <option value="">Selecione</option>
                <option value="male">Macho</option>
                <option value="female">Fêmea</option>
              </select>
            </div>
          </div>
        </div>

        <Select
          species={species}
          vacines={vaccines}
          setVacines={setVacines}
        />

        <button className={styles.button} onClick={handleClick}>
          Cadastrar Animal <PlusOutlined />
        </button>
      </div>
    </div>
  );
}

export default AddAnimal;
