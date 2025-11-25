import { useState } from "react";

import styles from "./Signup.module.css";
import UserService from "../../../../services/UserServices";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
};

function Signup({setStepper}: Props) {
  const [files, setFiles] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleUser = async (
    name: string, 
    email: string,
    password: string,
    phone: string
  ) => {
    const response = await UserService.registerUser({
      name,
      email,
      pass: password,
      celular: phone,
    });

    if (response == 201) {
      setStepper(1);
    }
  };

    // const handleImage = async () => {
    //   const input = document.querySelector<HTMLInputElement>("input[type=file]");
    //   if (!input?.files?.length) return;

    //   const file = input.files[0];
    //   const filename = file.name;
    //   const extension = file.type;
    //   const MIME_TYPES_PERMITIDOS = [
    //     "image/jpeg",
    //     "image/png",
    //     "image/jpg",
    //   ];
    //   if(!MIME_TYPES_PERMITIDOS.includes(extension)) {
    //     // formato nao permitido
    //     alert("formato não permitido")
    //     return
    //   }

    //   // UserService.getURL(MIME_TYPES_PERMITIDOS, filename as string);
    //   const urls = await UserService.getURL(extension, filename as string);
      
    //   UserService.sendImage(urls.uploadURL, files, extension)
    // };

  return (
    <div className={styles["container-register"]}>
      {/* <div className={styles["image-container"]}>
        {files != "" && <img className={styles["image-view"]} src={files}></img>}
        <input
          className={styles["image-input"]}
          type="file"
          onChange={(e) => {
            setFiles(URL.createObjectURL(e.target.files![0]));
          }}
        />
      </div> */}

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
          handleUser(name, email, password, phone);
          // handleImage();
        }}
      >
        Cadastrar 
      </button>
    </div>
  );
}

export default Signup;
