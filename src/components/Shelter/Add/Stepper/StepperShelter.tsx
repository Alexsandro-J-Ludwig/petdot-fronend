import { useState } from "react";
import styles from "./StepperShelter.module.css";
import {
  HomeOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import AddShelter from "../Shelter/AddShelter";
import { ShelterContext } from "../Context/ShelterContext";
import { AddressContext } from "../Context/AddressContext";
import Address from "../Address/Address";
import Review from "../Review/Review";

type Props = {
  s: number;
};

function StepperShelter({ s }: Props) {
  const [step, setStep] = useState(s);

  const steps = [
    {
      title: "Identificação",
      description: "Dados básicos e contato",
      icon: <HomeOutlined />,
    },
    {
      title: "Endereço",
      description: "Localização do abrigo",
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Confirmação",
      description: "Revisar e salvar",
      icon: <CheckOutlined />,
    },
  ];

  return (
    <ShelterContext>
      <AddressContext>
        <div className={styles.wrapper}>
          <div className={styles.mainCard}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              {steps.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.stepItem} ${
                    step === index
                      ? styles.active
                      : step > index
                      ? styles.completed
                      : ""
                  }`}
                >
                  <div className={styles.stepIconWrapper}>{item.icon}</div>
                  <div className={styles.stepContent}>
                    <span className={styles.stepTitle}>{item.title}</span>
                    <span className={styles.stepDescription}>
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className={styles.contentArea}>
              {step === 0 && <AddShelter setStepper={setStep} />}
              {step === 1 && <Address setStepper={setStep} />}
              {step === 2 && <Review setStepper={setStep} />}

              {step > 0 && step < 2 && (
                <div className={styles["button-container"]}>
                  <button
                    className={styles["back-button"]}
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeftOutlined /> Voltar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </AddressContext>
    </ShelterContext>
  );
}

export default StepperShelter;
