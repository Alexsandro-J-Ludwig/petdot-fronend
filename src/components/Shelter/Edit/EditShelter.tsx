import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import styles from "./EditShelter.module.css";
import {
  ShopOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function EditShelter() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");

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

  const handleEdit = async () => {
    const response = await ShelterService.editShelter(uuid, {
      name: name,
      cnpj: cnpj,
      phone: phone,
      email: email,
    });

    if (response === 200) {
      alert("Abrigo editado com sucesso!");
    } else {
      alert("Erro ao editar abrigo");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Editar Abrigo</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Selecionar Abrigo</label>
          <div className={styles.inputWrapper}>
            <SearchOutlined className={styles.icon} />
            <select
              className={`${styles.field} ${styles.select}`}
              onChange={(e) => {
                setUuid(e.target.value);
              }}
              value={uuid}
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
          <label className={styles.label}>Nome Fantasia</label>
          <div className={styles.inputWrapper}>
            <ShopOutlined className={styles.icon} />
            <input
              placeholder="Nome Fantasia"
              className={styles.field}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>CNPJ</label>
          <div className={styles.inputWrapper}>
            <FileTextOutlined className={styles.icon} />
            <input
              placeholder="CNPJ"
              className={styles.field}
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Celular</label>
          <div className={styles.inputWrapper}>
            <PhoneOutlined className={styles.icon} />
            <input
              placeholder="Celular"
              className={styles.field}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <div className={styles.inputWrapper}>
            <MailOutlined className={styles.icon} />
            <input
              placeholder="Email"
              className={styles.field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.button} onClick={handleEdit}>
          Salvar Alterações <SaveOutlined />
        </button>
      </div>
    </div>
  );
}

export default EditShelter;
