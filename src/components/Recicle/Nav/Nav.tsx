import { Menu, MenuItem } from "@mui/material";
import Hamburger from "hamburger-react";
import { useState, useRef } from "react";
import styles from "./Nav.module.css";
import UserService from "../../../services/Users/UserServices";
import pata from "../../../assets/icons/pata.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const requestAPI = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      if(response.data.acesso === "2") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
  };

  return (
    <div className={styles["container-nav"]}>
      <div ref={anchorRef} className={styles["hamburger"]}>
        <Hamburger
          size={40}
          toggled={isOpen}
          onToggle={(toggled) => {
            requestAPI();
            setOpen(toggled);
          }}
        />
      </div>

      <Menu
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            navigate("/user");
          }}
        >
          Perfil
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            navigate("/shelter");
          }}
        >
          Área Abrigo
        </MenuItem>

        {admin && (
          <MenuItem
            onClick={() => {
              setOpen(false);
               navigate("/animal");
            }}
          >
            Animal
          </MenuItem>
        )}
      </Menu>

      <div className={styles["titulo-container"]}>
        <Link to="/menu" className={styles["link"]}>
          <h1 className={styles["titulo"]}>PetDot</h1>

          <img className={styles["pata"]} src={pata} />
        </Link >
      </div>
    </div>
  );
}

export default Nav;
