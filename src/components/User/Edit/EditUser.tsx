import { useState } from "react";
import styles from "./EditUSer.module.css";
import Select from "./select/Select";
import UserService from "@/services/Users/UserServices";
import AddressService from "@/services/AddressService";
import { Box, CircularProgress } from "@mui/material";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  NumberOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

function EditUser() {
  const [loading, setLoadding] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");

  const sendUpdateUser = async () => {
    if (name || email || password || phone) {
      const response = await UserService.updateUser({
        name,
        email,
        password,
        phone,
      });

      if (response === 200) {
        alert("Usuário atualizado com sucesso!");
      }
    }

    sendUpdateAddress();
  };

  const sendUpdateAddress = async () => {
    const request = await AddressService.getAddress();
    const uuid = request.uuid;

    if (address || number || complement || district || city || state || cep) {
      const response = await AddressService.editAddress(uuid, {
        address,
        number,
        complement,
        district,
        city,
        state,
        cep,
      });

      if (response === 200) {
        alert("Endereço atualizado com sucesso!");
      }
    }
  };

  const InputField = ({
    label,
    value,
    setValue,
    placeholder,
    icon,
    type = "text",
    fullWidth = false,
  }: {
    label: string;
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
    fullWidth?: boolean;
  }) => (
    <div className={`${styles.inputGroup} ${fullWidth ? styles.fullWidth : ""}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>{icon}</span>
        <input
          className={styles.field}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <CircularProgress sx={{ color: "#5d4037" }} />
        </Box>
      ) : (
        <div className={styles.card}>
          <h2 className={styles.title}>Editar dados</h2>

          <h3 className={styles.sectionTitle}>
            <UserOutlined /> Dados Pessoais
          </h3>
          <div className={styles.grid}>
            <InputField
              label="Nome"
              value={name}
              setValue={setName}
              placeholder="Nome"
              icon={<UserOutlined />}
              fullWidth
            />
            <InputField
              label="Email"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              icon={<MailOutlined />}
              fullWidth
            />
            <InputField
              label="Senha"
              value={password}
              setValue={setPassword}
              placeholder="Senha"
              icon={<SafetyCertificateOutlined />}
              type="password"
            />
            <InputField
              label="Celular"
              value={phone}
              setValue={setPhone}
              placeholder="Celular"
              icon={<PhoneOutlined />}
            />
          </div>

          <h3 className={styles.sectionTitle}>
            <EnvironmentOutlined /> Endereço
          </h3>
          <div className={styles.grid}>
            <InputField
              label="Endereço"
              value={address}
              setValue={setAddress}
              placeholder="Endereço"
              icon={<EnvironmentOutlined />}
              fullWidth
            />
            <InputField
              label="Número"
              value={number}
              setValue={setNumber}
              placeholder="Número"
              icon={<NumberOutlined />}
            />
            <InputField
              label="Complemento"
              value={complement}
              setValue={setComplement}
              placeholder="Complemento"
              icon={<InfoCircleOutlined />}
            />
            <InputField
              label="Bairro"
              value={district}
              setValue={setDistrict}
              placeholder="Bairro"
              icon={<HomeOutlined />}
            />
            <InputField
              label="Cidade"
              value={city}
              setValue={setCity}
              placeholder="Cidade"
              icon={<EnvironmentOutlined />}
            />

            <div className={styles.inputGroup}>
              <label className={styles.label}>Estado</label>
              <div className={styles.inputWrapper}>
                <span className={styles.icon}><EnvironmentOutlined /></span>
                <Select setStates={setState} />
              </div>
            </div>

            <InputField
              label="CEP"
              value={cep}
              setValue={setCep}
              placeholder="CEP"
              icon={<NumberOutlined />}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={sendUpdateUser}>
              Atualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditUser;
