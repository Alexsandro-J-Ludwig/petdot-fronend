import styles from "./Address.module.css";
import Select from "./select/Select";
import { useAddress } from "../Contexts/AddressContext";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Address() {
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
      <input
        placeholder="Numero"
        className={styles["field"]}
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        required
      />
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
          setCep(e.target.value);
        }}
        required
      />
    </div>
  );
}

export default Address;
