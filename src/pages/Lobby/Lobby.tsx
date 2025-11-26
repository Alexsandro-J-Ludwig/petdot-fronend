import Footer from "../../components/Recicle/Footer/Footer";
import Login from "../../components/User/Login/Login";
import Register from "../../components/User/Signup/Stepper/Sterpper";
import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <>
      <div className={styles["container-lobby"]}>
        <h1>PetDot</h1>
        <div className={styles["container-register-login"]}>
          <Register />
          <Login />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Lobby;
