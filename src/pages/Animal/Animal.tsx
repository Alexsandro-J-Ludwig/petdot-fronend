import AddAnimal from "../../components/Animal/AddAnimal/AddAnimal";
import DeleteAnimal from "../../components/Animal/DeleteAnimal/DeleteAnimal";
import EditAnimal from "../../components/Animal/EditAnimal/EditAnimal";
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
      <div>
        <AddAnimal
          open={openModal === "add"}
          onOpen={() => setOpenModal("add")}
          onClose={() => setOpenModal(null)}
        />
        <EditAnimal
          open={openModal === "edit"}
          onOpen={() => setOpenModal("edit")}
          onClose={() => setOpenModal(null)}
        />
        <DeleteAnimal
          open={openModal === "delete"}
          onOpen={() => setOpenModal("delete")}
          onClose={() => setOpenModal(null)}
        />
      </div>
    </>
  );
}

export default Animal;
