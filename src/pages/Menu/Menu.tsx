import { useEffect } from "react";
import Nav from "../../components/Recicle/Nav/Nav";
import { Validator } from "../../services/Users/Validate";
import styles from "./Menu.module.css";
import ShowAnimals from "../../components/Animal/ShowAnimals/ShowAnimals";
import Footer from "@/components/Recicle/Footer/Footer";

function Menu() {

  useEffect(() => {
    Validator();
  }, []);

  return (
    <>
      <div className={styles["nav"]}>
        <Nav />
      </div>

      <ShowAnimals/>
      
      <Footer/>
    </>
  );
}

export default Menu;
