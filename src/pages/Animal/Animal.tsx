import AddAnimal from "../../components/Animal/AddAnimal/AddAnimal";
import UserService from "../../services/Users/UserServices";
import styles from "./Animal.module.css";
import { useEffect, useState } from "react";

function Animal() {
  const [admin, setAdmin] = useState(false);
  const [openModal, setOpenModal] = useState<"add" | "edit" | "delete" | null>(
    null
  );

  useEffect(() => {
    requestAPI();
  });

  const requestAPI = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      const acesso = response.data.acesso;

      if (acesso == 2) {
        setAdmin(true);
      }
    }
  };

  return (
    <>
      {admin == true && (
        <div>
          <AddAnimal
            open={openModal === "add"}
            onOpen={() => setOpenModal("add")}
            onClose={() => setOpenModal(null)}
          />
        </div>
      )}
    </>
  );
}

export default Animal;
