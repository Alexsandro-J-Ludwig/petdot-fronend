import { useEffect, useState } from "react";
import UserService from "../../services/UserServices";
import AddShelter from "../../components/Shelter/Add/AddShelter";
import Nav from "../../components/Recicle/Nav/Nav";
import Footer from "../../components/Recicle/Footer/Footer";
import EditShelter from "../../components/Shelter/Edit/EditShelter";

function Shelter() {

  useEffect(() => {
    requestAPi();
  }, []);

  const requestAPi = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <>
      <Nav />
      <AddShelter />
      <EditShelter />
      <Footer />
    </>
  );
}

export default Shelter;
