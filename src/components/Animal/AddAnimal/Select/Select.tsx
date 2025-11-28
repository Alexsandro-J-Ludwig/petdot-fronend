import styles from "./Select.module.css";

type Props = {
  species: string;
  vacines: string[];
  setVacines: React.Dispatch<React.SetStateAction<string[]>>;
};

function Select({ species, vacines, setVacines }: Props) {
  const toggle = (v: string) => {
    setVacines((atual) =>
      atual.includes(v) ? atual.filter((x) => x !== v) : [...atual, v]
    );
  };

  const cachorro = [
    { id: "v8_v10", nome: "V8 / V10" },
    { id: "antirrabica", nome: "Antirrábica" },
    { id: "giardia", nome: "Giárdia" },
    { id: "tosse_dos_canis", nome: "Tosse dos Canis (Bordetella)" },
    { id: "leishmaniose", nome: "Leishmaniose" },
  ];

  const gato = [
    { id: "v3_v4_v5", nome: "V3 / V4 / V5" },
    { id: "antirrabica", nome: "Antirrábica" },
    { id: "felv", nome: "FeLV (Leucemia Felina)" },
  ];

  const passaro = [
    { id: "bouba", nome: "Bouba Aviária" },
    { id: "newcastle", nome: "Doença de Newcastle" },
    { id: "gumboro", nome: "Gumboro" },
  ];

  const coelho = [
    { id: "mixomatose", nome: "Mixomatose" },
    { id: "rhd", nome: "VHD / RHD (Doença Hemorrágica Viral)" },
  ];

  return (
    <>
      {species == "Cachorro" && (
        <div>
          {cachorro.map((item, indice) => (
            <label key={indice} className={styles["vacinas"]}>
              <input
                type="checkbox"
                checked={vacines.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={styles["fields"]}
              />
              {item.nome}
            </label>
          ))}
        </div>
      )}
      {species == "Gato" && (
        <div>
          {gato.map((item, indice) => (
            <label key={indice} className={styles["vacinas"]}>
              <input
                type="checkbox"
                checked={vacines.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={styles["fields"]}
              />
              {item.nome}
            </label>
          ))}
        </div>
      )}
      {species == "Pássaro" && (
        <div>
          {passaro.map((item, indice) => (
            <label key={indice} className={styles["vacinas"]}>
              <input
                type="checkbox"
                checked={vacines.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={styles["fields"]}
              />
              {item.nome}
            </label>
          ))}
        </div>
      )}
      {species == "Coelho" && (
        <div>
          {coelho.map((item, indice) => (
            <label key={indice} className={styles["vacinas"]}>
              <input
                type="checkbox"
                checked={vacines.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={styles["fields"]}
              />
              {item.nome}
            </label>
          ))}
        </div>
      )}
    </>
  );
}

export default Select;
