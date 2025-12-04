
import { useState, useEffect } from "react";
import styles from "./Info.module.css";
import { Box, CircularProgress } from "@mui/material";
import UserService from "@/services/Users/UserServices";
import AddressService from "@/services/AddressService";
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

function Info() {
  const [loading, setLoadding] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nivel, setNivel] = useState("");

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [distric, setDistric] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    handleInfo();
  }, []);

  const handleInfo = async () => {
    setLoadding(true);
    const user = await UserService.getInfo();
    const address = await AddressService.getAddressByuser();
    
    setName(user.data.user.data.name);
    setEmail(user.data.user.data.email);
    setPhone(user.data.user.data.celular);
    setNivel(user.data.user.data.nivel_acesso === 1 ? "Normal" : "Administrativo");

    setAddress(address.data.address);
    setNumber(address.data.number);
    setComplement(address.data.complement);
    setDistric(address.data.neighborhood);
    setCity(address.data.city);
    setState(address.data.state);
    setCep(address.data.cep);

    setLoadding(false);
  };

  const ReadOnlyField = ({
    label,
    value,
    icon,
    fullWidth = false,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    fullWidth?: boolean;
  }) => (
    <div className={`${styles.inputGroup} ${fullWidth ? styles.fullWidth : ""}`}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>{icon}</span>
        <input className={styles.field} value={value} readOnly />
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
          <h2 className={styles.title}>Minhas Informações</h2>

          <h3 className={styles.sectionTitle}>
            <UserOutlined /> Dados Pessoais
          </h3>
          <div className={styles.grid}>
            <ReadOnlyField
              label="Nome"
              value={name}
              icon={<UserOutlined />}
              fullWidth
            />
            <ReadOnlyField
              label="Email"
              value={email}
              icon={<MailOutlined />}
              fullWidth
            />
            <ReadOnlyField
              label="Celular"
              value={phone}
              icon={<PhoneOutlined />}
            />
            <ReadOnlyField
              label="Acesso"
              value={nivel}
              icon={<SafetyCertificateOutlined />}
            />
          </div>

          <h3 className={styles.sectionTitle}>
            <EnvironmentOutlined /> Endereço
          </h3>
          <div className={styles.grid}>
            <ReadOnlyField
              label="Endereço"
              value={address}
              icon={<EnvironmentOutlined />}
              fullWidth
            />
            <ReadOnlyField
              label="Número"
              value={number}
              icon={<NumberOutlined />}
            />
            <ReadOnlyField
              label="Complemento"
              value={complement}
              icon={<InfoCircleOutlined />}
            />
            <ReadOnlyField
              label="Bairro"
              value={distric}
              icon={<HomeOutlined />}
            />
            <ReadOnlyField
              label="Cidade"
              value={city}
              icon={<EnvironmentOutlined />}
            />
            <ReadOnlyField
              label="Estado"
              value={state}
              icon={<EnvironmentOutlined />}
            />
            <ReadOnlyField
              label="CEP"
              value={cep}
              icon={<NumberOutlined />}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Info;
