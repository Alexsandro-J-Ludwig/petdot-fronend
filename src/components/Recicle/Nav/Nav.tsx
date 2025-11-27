import { Menu, MenuItem } from "@mui/material";
import Hamburger from "hamburger-react";
import { useState, useRef, useEffect } from "react";
import styles from "./Nav.module.css";
import UserService from "../../../services/Users/UserServices";

function Nav() {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [admin, setAdmin] = useState(false);

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
    <div className={styles["container-nav"]}>
      <div ref={anchorRef} className={styles["hamburger"]}>
        <Hamburger
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
            window.location.href = "/profile";
          }}
        >
          Pefil
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            window.location.href = "/shelter";
          }}
        >
          Área Abrigo
        </MenuItem>

        {admin == true && (
          <MenuItem
            onClick={() => {
              setOpen(false);
              window.location.href = "/animal";
            }}
          >
            Animal
          </MenuItem>
        )}
      </Menu>

      <h1 className={styles["titulo"]}>
        <a className={styles["link"]} href="/menu">
          PetDot
        </a>
      </h1>
    </div>
  );
}

export default Nav;
