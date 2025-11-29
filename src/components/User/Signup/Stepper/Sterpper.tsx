import { Modal } from "@mui/material";
import { useState } from "react";
import Signup from "../Register/Signup";
import Address from "../Address/Address";
import RegisterContent from "../RegisterContent/RegisterContent";
import styles from "./Stepper.module.css";
import { UserContext } from "../Contexts/UserContext,";
import { AddressContext } from "../Contexts/AddressContext";
import { Steps } from "antd";
import {
  UserAddOutlined,
  HomeOutlined,
  CheckOutlined,
} from "@ant-design/icons";

function Register() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setStep(0);
  };
  const handleClose = () => setOpen(false);

  const stepsItems = [
    {
      title: "Cadastro",
      icon: <UserAddOutlined style={{ color: step >= 0 ? "blue" : "grey" }} />,
    },
    {
      title: "Endereço",
      icon: <HomeOutlined style={{ color: step >= 1 ? "blue" : "grey" }} />,
    },
    {
      title: "Confirmar",
      icon: <CheckOutlined style={{ color: step >= 2 ? "blue" : "grey" }} />,
    },
  ];

  return (
    <>
      <button className={styles["button"]} onClick={handleOpen}>
        Cadastrar
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        className={styles["stepper-container"]}
      >
        <div className={styles["container-register"]}>
          <h1 className={styles["title"]}>Cadastro</h1>

          <UserContext>
            <AddressContext>
              <Steps current={step} items={stepsItems} />

              {step === 0 && <Signup />}
              {step === 1 && <Address />}
              {step === 2 && <RegisterContent />}

              <div className={styles["button-container"]}>
                {step > 0 && (
                  <button
                    className={styles["back-button"]}
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </button>
                )}

                {step < 2 && (
                  <button
                    className={styles["next-button"]}
                    onClick={() => {
                      setStep(step + 1);
                    }}
                  >
                    Avançar
                  </button>
                )}

                {step == 2 && (
                  <button
                    className={styles["submit-button"]}
                    onClick={() => setStep(step + 1)}
                  >
                    Avançar
                  </button>
                )}
              </div>
            </AddressContext>
          </UserContext>
        </div>
      </Modal>
    </>
  );
}

export default Register;
