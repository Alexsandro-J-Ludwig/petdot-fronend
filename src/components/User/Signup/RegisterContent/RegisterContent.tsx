import AddressService from "@/services/AddressService";
import UserService from "@/services/Users/UserServices";
import { useAddress } from "../Contexts/AddressContext";
import { useUser } from "../Contexts/UserContext,";
import styles from "./RegisterContent.module.css";
import {
  UserOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function RegisterContent({ setStepper }: Props) {
  const { name, email, password, phone } = useUser();
  const { address, number, complement, district, city, state, cep } =
    useAddress();

  const handleUser = async () => {
    const response = await UserService.registerUser({
      name: name,
      email: email,
      pass: password,
      celular: phone,
    });

    if (response == 201) {
      handleAddress();
    }
  };

  const handleAddress = async () => {
    const request = await AddressService.addAddress({
      address: address,
      number: number,
      complement: complement,
      neighborhood: district,
      city: city,
      state: state,
      cep: cep,
    });

    if (request == 201) {
      window.location.href = "/menu";
    }
  };

  return (
    <div className={styles.container}>

      {/* Dados da Conta */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <div className={styles.iconWrapperBlue}>
              <UserOutlined />
            </div>
            <h3 className={styles.cardTitle}>Dados da Conta</h3>
          </div>
          <button className={styles.editButton}
            onClick={() => setStepper(0)}
          >
            <EditOutlined />
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>NOME</label>
            <p className={styles.value}>{name}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>EMAIL</label>
            <p className={styles.value}>{email}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>CELULAR</label>
            <p className={styles.value}>{phone}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>SENHA</label>
            <div className={styles.passwordGroup}>
              <p className={styles.value}>{password}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Endereço de Entrega */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <div className={styles.iconWrapperPurple}>
              <EnvironmentOutlined />
            </div>
            <h3 className={styles.cardTitle}>Endereço de Entrega</h3>
          </div>
          <button className={styles.editButton}
          onClick={() => setStepper(1)}
          >
            <EditOutlined />
          </button>
        </div>

        <div className={styles.addressContent}>
          <p className={styles.addressMain}>
            {address}, {number}
          </p>
          <p className={styles.addressSub}>
            {district} - {city}
          </p>
          <p className={styles.addressSub}>
            {state} - BR
          </p>
          <span className={styles.cepTag}>CEP {cep}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.confirmButton} onClick={handleUser}>
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
}

export default RegisterContent;
