import { useEffect, useState } from "react";
import ShelterService from "../../../services/ShelterService";
import styles from "./DeleteShelter.module.css";
import { DeleteOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserService from "@/services/Users/UserServices";

function DeleteShelter() {
  const [uuid, setUuid] = useState("");
  const navigate = useNavigate()

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

  const handleDelete = async () => {
    if (!uuid) {
      alert("Selecione um abrigo para deletar");
      return;
    }

    if (confirm("Tem certeza que deseja deletar este abrigo? Esta ação não pode ser desfeita.")) {
      const response = await ShelterService.deleteShelter(uuid);

      if (response === 200) {
        const uuid = localStorage.getItem("token") || "";
        const request = await ShelterService.getAllShelter(uuid)

        if(request.data.length === 0) {
          const response = await UserService.updateUser({ nivel_acesso: 1 });
          
          if (response === 200) {
            localStorage.removeItem("token");
            navigate("/");
            return;
          }
        }
        navigate("/menu")
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Deletar Abrigo</h2>

        <div className={styles.warningText}>
          <WarningOutlined /> Cuidado: Esta ação removerá permanentemente o abrigo e todos os dados associados.
        </div>

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

        <button className={styles.button} onClick={handleDelete}>
          Deletar Abrigo <DeleteOutlined />
        </button>
      </div>
    </div>
  );
}

export default DeleteShelter;
