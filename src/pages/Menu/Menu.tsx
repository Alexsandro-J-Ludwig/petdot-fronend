import { useEffect } from "react";
import Nav from "../../components/Recicle/Nav/Nav";
import { Validator } from "../../services/Users/Validate";
import styles from "./Menu.module.css";

function Menu() {

  useEffect(() => {
    Validator();
  }, []);

  return (
    <>
      <div className={styles["nav"]}>
        <Nav />
      </div>
    </>
  );
}

export default Menu;
