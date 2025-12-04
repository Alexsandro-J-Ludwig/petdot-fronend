import { Box, CircularProgress } from "@mui/material";
import styles from "./Adoption.module.css";
import { useEffect, useState } from "react";
import AdoptionsService from "@/services/Adoption";

function Adoption() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([] as {
    uuid_animal: string
    uuid_shelter: string,
    adoption_data: String
  }[])
  useEffect(() => {
    handleAdoption();
  }, []);

  const handleAdoption = async () => {
    const response = await AdoptionsService.getByUser();

    
  };

  return (
    <div>
      <div>
        <h1>Adoções</h1>

        <div>
          <img alt="animal" />
        </div>

        <div>
          <label>
            NOME DO ANIMAL:
            <p></p>
          </label>
        </div>

        <div>
          <label>
            ABRIGO:
            <p></p>
          </label>
        </div>

        <div>
          <label>
            DATA DE ADOÇÃO
            <p></p>
          </label>
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <CircularProgress sx={{ color: "#5d4037" }} />
      </Box>
    </div>
  );
}

export default Adoption;
