import { Box, CircularProgress } from "@mui/material";
import styles from "./Adoption.module.css";
import { useEffect, useState } from "react";
import AdoptionsService from "@/services/Adoption";
import ShelterService from "@/services/ShelterService";
import AnimalService from "@/services/AnimalService";
import { Card } from "antd";

const { Meta } = Card;

type AdoptionView = {
  animalName: string;
  animalImage: string;
  shelterName: string;
  adoptionDate: string;
};

function Adoption() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [adoptions, setAdoptions] = useState<AdoptionView[]>([]);

  useEffect(() => {
    handleInfo().then(() => {
      setTimeout(() => setVisible(true), 50);
    });
  }, []);

  const handleInfo = async () => {
    setLoading(true);

    try {
      const response = await AdoptionsService.getByUser();
      const items = response.data.map((item: any) => item);
      
      const results = await Promise.all(
        items.map(async (item: any) => {
          const animal = await AnimalService.getAnimal(item.uuid_animal);
          const shelter = await ShelterService.getShelterByUUID(
            item.uuid_shelter
          );

          return {
            animalName: animal.data.data.name,
            animalImage: animal.data.data.imageURL,
            shelterName: shelter.data.name,
            adoptionDate: age(item.adoption_date),
          };
        })
      );

      setAdoptions(results);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const age = (date: string) => {
    const a = new Date(date);
    const b = new Date();

    let anos = b.getFullYear() - a.getFullYear();
    let meses = b.getMonth() - a.getMonth();

    // Ajuste caso o mês final seja menor que o inicial
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    // Ajuste se quiser considerar também o dia
    if (b.getDate() < a.getDate()) {
      meses--;

      if (meses < 0) {
        anos--;
        meses += 12;
      }
    }

    return `Adotado há: ${anos === 0 ? "" : anos === 1 ? `${anos} ano e` : `${anos} anos e`
      } ${meses} ${meses === 1 ? "mes" : "meses"}`;
  };

  return (
    <div>
      {!loading && (
        <div>
          <h1 style={{ color: "#5d4037" }}>Animais adotados</h1>
          <div className={styles["cardsContainer"]}>
            {adoptions.map((item: any, i: number) => (
              <div
                key={i}
                className={`${styles["animal-card"]} ${visible ? styles["cardsContainerShow"] : ""
                  }`}
                style={{
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                <Card
                  hoverable
                  style={{ width: 290, height: 535 }}
                  classNames={styles["card"]}
                  cover={
                    <img
                      draggable={false}
                      alt="Animais"
                      src={item.animalImage}
                      width={200}
                      height={330}
                    />
                  }
                >
                  <Meta style={{ color: "#5d4037" }} title={item.animalName} />

                  <div className={styles["shelter-container"]}>
                    <h3
                      style={{ color: "#5d4037" }}
                      className={styles["date-title"]}
                    >
                      Abrigo:
                    </h3>
                    <h3
                      style={{ color: "#5d4037" }}
                      className={styles["item-shelter"]}
                    >
                      {item.shelterName}
                    </h3>
                  </div>

                  <div className={styles["date-container"]}>
                    <h3
                      style={{ color: "#5d4037" }}
                      className={styles["date-title"]}
                    >
                      Adotado há:
                    </h3>
                    <h3 style={{ color: "#5d4037" }} className={styles["date"]}>
                      {item.adoptionDate}
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <CircularProgress sx={{ color: "#5d4037" }} />
        </Box>
      )}
    </div>
  );
}

export default Adoption;
