import { useState } from "react";

import styles from "./Signup.module.css";
import UserService from "../../../../../../services/UserServices";

function Signup() {
  const [file, setFile] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleUser = (
    name: string, 
    email: string,
    password: string,
    phone: string
  ) => {
    UserService.registerUser({
      name,
      email,
      pass: password,
      celular: phone,
    });
  };

  const handleImage = async () => {
    const input = document.querySelector<HTMLInputElement>("input[type=file]");
    if (!input?.files?.length) return;

    const file = input.files[0]; // File real
    const filename = file.name; // só o nome do arquivo
    const extension = file.type;
    const MIME_TYPES_PERMITIDOS = [
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if(!MIME_TYPES_PERMITIDOS.includes(extension)) {
      // formato nao permitido
      alert("formato não permitido")
      return
    }
    // UserService.getURL(MIME_TYPES_PERMITIDOS, filename as string);
    const urls = await UserService.getURL(extension, filename as string);
    console.log(urls.uploadURL);
    
    UserService.sendImage(urls.uploadURL, file)
  };

  return (
    <div className={styles["container-register"]}>
      <div className={styles["image-container"]}>
        {file != "" && <img className={styles["image-view"]} src={file}></img>}
        <input
          className={styles["image-input"]}
          type="file"
          onChange={(e) => {
            setFile(URL.createObjectURL(e.target.files![0]));
          }}
        />
      </div>

      <input
        className={styles["field"]}
        placeholder="Nome"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className={styles["field"]}
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className={styles["field"]}
        placeholder="Senha"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        className={styles["field"]}
        placeholder="Celular"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <button
        className={styles["button"]}
        onClick={() => {
          handleUser(name, email, password, phone), handleImage();
        }}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default Signup;
