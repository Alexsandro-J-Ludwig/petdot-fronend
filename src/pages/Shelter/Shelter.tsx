import { useEffect, useState } from "react";
import AddShelter from "../../components/Shelter/Add/AddShelter";
import Nav from "../../components/Recicle/Nav/Nav";
import Footer from "../../components/Recicle/Footer/Footer";
import EditShelter from "../../components/Shelter/Edit/EditShelter";
import DeleteShelter from "../../components/Shelter/Delete/DeleteShelter";
import { Validator } from "../../services/Users/Validate";
import UserService from "../../services/Users/UserServices";

function Shelter() {
  const [openModal, setOpenModal] = useState<"add" | "edit" | "delete" | null>(
    null
  );

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    Validator();

    const handleAdmin = async () => {
      const response = await UserService.me();
      const acesso = response.data.acesso;

      if (acesso == 2) {
        setAdmin(true);
      }
    };

    handleAdmin()
  }, []);

  return (
    <>
      <Nav />
      <AddShelter
        open={openModal === "add"}
        onOpen={() => setOpenModal("add")}
        onClose={() => setOpenModal(null)}
      />
      {admin == true && (
        <EditShelter
          open={openModal === "edit"}
          onOpen={() => setOpenModal("edit")}
          onClose={() => setOpenModal(null)}
        />
      )}

      {admin == true && (
        <DeleteShelter
          open={openModal === "delete"}
          onOpen={() => setOpenModal("delete")}
          onClose={() => setOpenModal(null)}
        />
      )}
      <Footer />
    </>
  );
}

export default Shelter;
