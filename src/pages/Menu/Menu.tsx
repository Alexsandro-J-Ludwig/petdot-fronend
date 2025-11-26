import Nav from "../../components/Recicle/Nav/Nav";
import UserService from "../../services/UserServices";
import styles from "./Menu.module.css";
import { useEffect, useState } from "react";

function Menu() {
  useEffect(() => {
    rquestAPI();
  }, []);

  const rquestAPI = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className={styles["nav"]}>
        <Nav />
      </div>
    </>
  );
}

export default Menu;
