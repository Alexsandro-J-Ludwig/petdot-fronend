import AddressService from "@/services/AddressService";
import styles from "./Review.module.css";
import {
  EditOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useShelter } from "../Context/ShelterContext";
import { useAddress } from "../Context/AddressContext";
import UserService from "@/services/Users/UserServices";
import ShelterService from "@/services/ShelterService";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";
import { useNavigate } from "react-router-dom";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Review({ setStepper }: Props) {
  const { name, cnpj, phone, email } = useShelter();
  const { address, number, complement, district, city, state, cep } =
    useAddress();
  const navigate = useNavigate()

  const handleAddShelter = async () => {
    const request = await ShelterService.addShelter({
      name: name,
      cnpj: cnpj,
      uuid_address: address,
      phone: phone,
      email: email,
    }); 

    if (request.status === 201) {
      handleAddress(request.data.data);
    } else {
      triggerSnackbar("Erro ao cadastrar abrigo");
    }
  };

  const handleAddress = async (uuid: string) => {
    const request = await AddressService.addAddressShelter({
      address: address,
      number: number,
      complement: complement,
      neighborhood: district,
      city: city,
      state: state,
      cep: cep,
      uuid
    });

    if (request == 201) {
      alterAccess();
    } else {
      triggerSnackbar("Erro ao cadastrar endereço");
    }
  };

  const alterAccess = async () => {
    const response = await UserService.updateUser({ nivel_acesso: 2 });

    if (response === 200) {
      navigate("/menu");
    } else {
      alert("Erro ao alterar o nível de acesso");
    }
  };

  return (
    <div className={styles.container}>
      {/* Dados da Conta */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <div className={styles.iconWrapperBlue}>
              <HomeOutlined />
            </div>
            <h3 className={styles.cardTitle}>Dados da Conta</h3>
          </div>
          <button className={styles.editButton} onClick={() => setStepper(0)}>
            <EditOutlined />
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>NOME</label>
            <p className={styles.value}>{name}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>CNPJ</label>
            <p className={styles.value}>{cnpj}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>CELULAR</label>
            <p className={styles.value}>{phone}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>EMAIL</label>
            <div className={styles.passwordGroup}>
              <p className={styles.value}>{email}</p>
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
            <h3 className={styles.cardTitle}>Endereço do Abrigo</h3>
          </div>
          <button className={styles.editButton} onClick={() => setStepper(1)}>
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
          <p className={styles.addressSub}>{state} - BR</p>
          <span className={styles.cepTag}>CEP {cep}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.confirmButton} onClick={handleAddShelter}>
          Finalizar Cadastro <CheckOutlined />
        </button>
      </div>
    </div>
  );
}

export default Review;
