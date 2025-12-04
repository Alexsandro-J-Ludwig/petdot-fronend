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
  ArrowLeftOutlined,
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
      icon: <UserAddOutlined style={{ color: step >= 0 ? "blue" : "grey" }} />,
    },
    {
      icon: <HomeOutlined style={{ color: step >= 1 ? "blue" : "grey" }} />,
    },
    {
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
        <div className={styles[`container-register-${step}`]}>
          <h1 className={styles["title"]}>Cadastro</h1>

          <UserContext>
            <AddressContext>
              <div className={styles["steps-container"]}>
                <Steps
                  current={step}
                  items={stepsItems}
                  titlePlacement="vertical"
                />
              </div>

              <div className={styles["stepper-content"]}>
                {step === 0 && <Signup setStepper={setStep} />}
                {step === 1 && <Address setStepper={setStep} />}
                {step === 2 && <RegisterContent setStepper={setStep} />}

                <div className={styles["button-container"]}>
                  {step > 0 && (
                    <button
                      className={styles["back-button"]}
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeftOutlined />
                    </button>
                  )}
                </div>
              </div>
            </AddressContext>
          </UserContext>
        </div>
      </Modal>
    </>
  );
}

export default Register;
