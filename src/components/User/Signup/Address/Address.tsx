import styles from "./Address.module.css";
import { useState } from "react";
import Select from "./select/Select";
import AddressService from "../../../../services/AddressService";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Address({ setStepper }: Props) {
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");

  const handleAddress = async () => {
    const request = await AddressService.addAddress({
      address,
      number,
      complement,
      district,
      city,
      state,
      cep,
    });

    if (request == 201) {
      setStepper(2);
    }

  };

  return (
    <div className={styles["container-address"]}>
      <input
        placeholder="Endereço"
        className={styles["field"]}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <input
        placeholder="Numero"
        className={styles["field"]}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <input
        placeholder="Complemento"
        className={styles["field"]}
        onChange={(e) => {
          setComplement(e.target.value);
        }}
      />
      <input
        placeholder="Bairro"
        className={styles["field"]}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
      />
      <input
        placeholder="Cidade"
        className={styles["field"]}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />

      <Select setStates={setState} />

      <input
        placeholder="CEP"
        className={styles["field"]}
        onChange={(e) => {
          setCep(e.target.value);
        }}
      />

      <button
        className={styles["button"]}
        onClick={() => {
          handleAddress();
        }}
      >
        Próximo
      </button>
    </div>
  );
}

export default Address;
