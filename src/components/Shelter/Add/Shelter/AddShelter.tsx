import React from "react";
import styles from "./AddShelter.module.css";
import { useShelter } from "../Context/ShelterContext";
import {
  ShopOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function AddShelter({ setStepper }: Props) {
  const { name, setName, cnpj, setCnpj, phone, setPhone, email, setEmail } =
    useShelter();

  const handleAddress = async () => {
    if (!name || !cnpj || !phone || !email) {
      triggerSnackbar("Por favor, preencha todos os campos.");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      triggerSnackbar("Por favor, insira um email válido.");
      return;
    }
    if (phone.length !== 11) {
      triggerSnackbar("Por favor, insira um telefone válido.");
      return;
    }
    if (cnpj.length !== 18) {
      triggerSnackbar("Por favor, insira um CNPJ válido.");
      return;
    }

    setStepper(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Dados Básicos</h1>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome Fantasia</label>
            <div className={styles.inputWrapper}>
              <ShopOutlined className={styles.icon} />
              <input
                placeholder="Ex: Abrigo Esperança"
                value={name}
                className={styles.field}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>CNPJ</label>
            <div className={styles.inputWrapper}>
              <FileTextOutlined className={styles.icon} />
              <input
                placeholder="00.000.000/0001-00"
                className={styles.field}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Celular</label>
              <div className={styles.inputWrapper}>
                <PhoneOutlined className={styles.icon} />
                <input
                  placeholder="(00) 00000-0000"
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
                  placeholder="contato@abrigo.com"
                  className={styles.field}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className={styles.button} onClick={handleAddress}>
            Próximo <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddShelter;
