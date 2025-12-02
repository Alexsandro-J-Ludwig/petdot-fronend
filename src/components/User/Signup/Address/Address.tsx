import styles from "./Address.module.css";
import Select from "./select/Select";
import { useAddress } from "../Contexts/AddressContext";
import { ArrowRightOutlined } from "@ant-design/icons";
import { triggerSnackbar } from "@/components/Recicle/Error/Error";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Address({ setStepper }: Props) {
  const {
    address,
    setAddress,
    number,
    setNumber,
    complement,
    setComplement,
    district,
    setDistrict,
    city,
    setCity,
    state,
    setState,
    cep,
    setCep,
  } = useAddress();

  const validation = () => {
    if (!address) {
      triggerSnackbar("Por favor, insira o endereço.");
      return;
    }
    if (!number) {
      triggerSnackbar("Por favor, insira o número do endereço.");
      return;
    }
    if (!district) {
      triggerSnackbar("Por favor, insira o bairro.");
      return;
    }
    if (!city) {
      triggerSnackbar("Por favor, insira a cidade.");
      return;
    }
    if (!state) {
      triggerSnackbar("Por favor, insira o estado.");
      return;
    }
    if (!cep) {
      triggerSnackbar("Por favor, insira o CEP.");
      return;
    }

    setStepper(2);
  };

  return (
    <div className={styles["container-address"]}>
      <input
        placeholder="Endereço"
        className={styles["field"]}
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        required
      />

      <div className={styles["select-number"]}>
        <input
          placeholder="Numero"
          className={styles["field-number"]}
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          disabled={number === "S/N" ? true : false}
        />
        <label className={styles["checkbox-text"]}>
          <input
            type="checkbox"
            checked={number === "S/N"}
            className={styles["checkbox-number"]}
            onChange={(e) => {
              if (e.target.checked) {
                setNumber("S/N");
              } else {
                setNumber("");
              }
            }}
          />
          S/N
        </label>
      </div>

      <input
        placeholder="Complemento"
        className={styles["field"]}
        value={complement}
        onChange={(e) => {
          setComplement(e.target.value);
        }}
        required
      />
      <input
        placeholder="Bairro"
        className={styles["field"]}
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
        required
      />
      <input
        placeholder="Cidade"
        className={styles["field"]}
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        required
      />

      <Select setStates={setState} />

      <input
        placeholder="CEP"
        className={styles["field"]}
        value={cep}
        onChange={(e) => {
          if (e.target.value.length > 5 && e.target.value[5] !== "-") {
            e.target.value =
              e.target.value.slice(0, 5) + "-" + e.target.value.slice(5, 8);
          }

          setCep(e.target.value);
        }}
        required
        maxLength={9}
      />

      <button
        className={styles["next-button"]}
        onClick={() => {
          validation();
        }}
      >
        <ArrowRightOutlined />
      </button>
    </div>
  );
}

export default Address;
