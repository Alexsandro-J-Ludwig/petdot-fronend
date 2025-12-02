import styles from "./Address.module.css";
import Select from "./select/Select";
import { useAddress } from "../Context/AddressContext";
import { ArrowRightOutlined, EnvironmentOutlined } from "@ant-design/icons";
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
    <div className={styles.container}>
      <h1 className={styles.title}>Endereço</h1>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Logradouro</label>
          <div className={styles.inputWrapper}>
            <EnvironmentOutlined className={styles.icon} />
            <input
              placeholder="Rua, Avenida, etc."
              className={styles.field}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup} style={{ flex: 1 }}>
            <label className={styles.label}>Número</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Nº"
                className={styles.field}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={number === "S/N"}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={number === "S/N"}
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
          </div>

          <div className={styles.inputGroup} style={{ flex: 2 }}>
            <label className={styles.label}>Complemento</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Apto, Bloco, etc."
                className={styles.field}
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Bairro</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Bairro"
                className={styles.field}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Cidade</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Cidade"
                className={styles.field}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Estado</label>
            <Select setStates={setState} />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>CEP</label>
            <div className={styles.inputWrapper}>
              <input
                placeholder="00000-000"
                className={styles.field}
                value={cep}
                onChange={(e) => {
                  if (e.target.value.length > 5 && e.target.value[5] !== "-") {
                    e.target.value =
                      e.target.value.slice(0, 5) +
                      "-" +
                      e.target.value.slice(5, 8);
                  }
                  setCep(e.target.value);
                }}
                required
                maxLength={9}
              />
            </div>
          </div>
        </div>

        <button
          className={styles.button}
          onClick={() => {
            validation();
          }}
        >
          Próximo <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
}

export default Address;
