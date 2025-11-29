import Footer from "../../components/Recicle/Footer/Footer";
import Login from "../../components/User/Login/Login";
import Register from "../../components/User/Signup/Stepper/Sterpper";
import styles from "./Lobby.module.css";
import pata from "../../assets/icons/pata.png";

function Lobby() {
  return (
    <div className={styles["lobby"]}>
      <div className={styles["container-lobby"]}>

        <div className={styles["page"]}>
          <h1 className={styles["title"]}>PetDot</h1>

          <img className={styles["pata-icon"]} src={pata} />
        </div>

        <p className={styles["description"]}>Adotar um amigo nunca foi tão fácil</p>

        <div className={styles["container-register-login"]}>
          <Register />
          <Login />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Lobby;
