import { Modal } from "@mui/material";
import { useState } from "react";
import styles from "./AnimalModalEdit.module.css";
import Select from "../../AddAnimal/Select/Select";
import AnimalService from "../../../../services/AnimalService";
import {
  EditOutlined,
  UserOutlined,
  CalendarOutlined,
  UploadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { triggerSnakeBarSuccess } from "@/components/Recicle/Error/Error";

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

  const [names, setname] = useState(name);
  const [births, setbirth] = useState(birth);
  const [species, setspecies] = useState("");
  const [breed, setbreed] = useState("");
  const [gender, setgender] = useState("");
  const [vaccines, setVacines] = useState<string[]>([]);
  const [imageURLs, setImageURL] = useState(imageURL);
  const [disponibles, setdisponible] = useState("");

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
          setImageURL(response.data.data.publicURL);
          return true;
        }
      }
    }

    alert("Formato de imagem não suportado");
    return false;
  };

  const handleUpdate = async () => {
    const response = await AnimalService.editAnimal(uuid, {
      name: names,
      redemption_date: births,
      specie: species,
      race: breed,
      gender,
      vaccines,
      iamgeURL: imageURLs,
      disponible: disponibles,
    });

    if (response.status === 200) {
      triggerSnakeBarSuccess("Animal atualizado com sucesso!");
      
      handleClose();
    }
  };

  return (
    <>
      <button className={styles.triggerButton} onClick={handleOpen}>
        <img src={imageURL} alt={name} className={styles.animalImage} />
        <div className={styles.animalInfo}>
          <span className={styles.animalName}>{name}</span>
          <span className={styles.animalDetails}>
            {birth} • {disponible ? "Disponível" : "Indisponível"}
          </span>
        </div>
        <EditOutlined style={{ marginLeft: "auto", color: "#5d4037" }} />
      </button>

      <Modal open={open} onClose={handleClose}>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>Editar {name}</h2>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Foto do Animal</label>
            {files ? (
              <img
                src={URL.createObjectURL(files[0])}
                alt="preview"
                className={styles.imagePreview}
              />
            ) : (
              <img
                src={imageURLs}
                alt="current"
                className={styles.imagePreview}
              />
            )}
            <label className={styles.fileInputLabel}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const f = e.target.files;
                  if (f && f.length > 0) {
                    setFiles(f);
                    await getURL(f[0]);
                  }
                }}
              />
              <UploadOutlined style={{ marginRight: "0.5rem" }} />
              Trocar Imagem
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome</label>
            <div className={styles.inputWrapper}>
              <UserOutlined className={styles.icon} />
              <input
                placeholder="Nome"
                className={styles.field}
                value={names}
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
                value={births}
                onChange={(e) => setbirth(e.target.value)}
              />
            </div>
          </div>

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

          <Select
            species={species}
            vacines={vaccines}
            setVacines={setVacines}
          />

          <div className={styles.inputGroup}>
            <label className={styles.label}>Disponibilidade</label>
            <div className={styles.inputWrapper}>
              <select 
                className={`${styles.field} ${styles.select}`}
                onChange={(e) => setdisponible(e.target.value)}
                value={disponibles.toString()}
              >
                <option value="">Selecione</option>
                <option value="true">Disponível</option>
                <option value="false">Indisponível</option>
              </select>
            </div>
          </div>

          <button className={styles.button} onClick={handleUpdate}>
            Salvar Alterações <SaveOutlined />
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AnimalModalEdit;
