import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Modal, StepLabel } from "@mui/material";
import { useState } from "react";
import Signup from "../Register/Signup"
import styles from "./Stepper.module.css";
import Address from "../Address/Address";

const steps = ["Cadastro", "Endereço"];

function renderStepper() {
  return steps.map((label) => (
    <Step key={label}>
      <StepLabel className={styles["stepper-label"]}>{label}</StepLabel>
    </Step>
  ));
}

function Register() {
  const [step, setStep] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={() => { handleOpen(); setStep(0); }}>Cadastrar</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles["container-register"]}>
          <Stepper
            activeStep={step}
            alternativeLabel
            className={styles["stepper"]}
          >
            {renderStepper()}
          </Stepper>

          {step === 0 && <Signup setStepper={setStep}/>}
          {step === 1 && <Address setStepper={setStep}/>}

          {step > 0 && (
            <button
              className={styles["button"]}
              onClick={() => {
                setStep(step - 1);
              }}
            >
              back
            </button>
          )}

        </div>
      </Modal>
    </div>
  );
}

export default Register;
