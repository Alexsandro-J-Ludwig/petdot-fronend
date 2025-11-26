import { Menu, MenuItem } from "@mui/material";
import Hamburger from "hamburger-react";
import { useState, useRef } from "react";
import styles from "./Nav.module.css";
import UserService from "../../../services/UserServices";

function Nav() {
  const [isOpen, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [admin, setAdmin] = useState(false);
  

  const requestAPI = async () => {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    setAdmin(response.data.data);
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
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            window.location.href = "/shelter";
          }}
        >
          Área Abrigo
        </MenuItem>
        {admin && (
          <MenuItem
            onClick={() => {
              setOpen(false);
              window.location.href = "/animal";
            }}
          >
            Logout
          </MenuItem>
        )}
      </Menu>

      <h1 className={styles["titulo"]}>PetDot</h1>
    </div>
  );
}

export default Nav;
