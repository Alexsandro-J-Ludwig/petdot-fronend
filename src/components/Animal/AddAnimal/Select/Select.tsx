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
    { id: "V8 / V10", nome: "V8 / V10" },
    { id: "Antirrábica", nome: "Antirrábica" },
    { id: "Giárdia", nome: "Giárdia" },
    { id: "Bordetella", nome: "Tosse dos Canis (Bordetella)" },
    { id: "Leishmaniose", nome: "Leishmaniose" },
  ];

  const gato = [
    { id: "v3 / v4 / v5", nome: "V3 / V4 / V5" },
    { id: "Raiva", nome: "Antirrábica" },
    { id: "Leucemia Felina", nome: "FeLV (Leucemia Felina)" },
  ];

  const passaro = [
    { id: "Bouba", nome: "Bouba Aviária" },
    { id: "Newcastle", nome: "Doença de Newcastle" },
    { id: "Gumboro", nome: "Gumboro" },
  ];

  const coelho = [
    { id: "mixomatose", nome: "Mixomatose" },
    { id: "VHD/ RHD", nome: "VHD / RHD (Doença Hemorrágica Viral)" },
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
