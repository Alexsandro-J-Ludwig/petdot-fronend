import { useEffect, useState } from "react";
import styles from "./EditUSer.module.css";
import Select from "./select/Select";
import UserService from "@/services/Users/UserServices";
import AddressService from "@/services/AddressService";
import {
  HomeOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");

  const [currentStep, setCurrentStep] = useState(0);

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

  const sendUpdateUser = async () => {
    if (name || email || password || phone) {
      const response = await UserService.updateUser({
        name,
        email,
        password,
        phone,
      });

      if (response === 200) {
        alert("Usuário atualizado com sucesso!");
      }
    }

    sendUpdateAddress();
  };

  const sendUpdateAddress = async () => {
    const request = await AddressService.getAddress();
    const uuid = request.uuid;

    if (address || number || complement || district || city || state || cep) {
      const response = await AddressService.editAddress(uuid, {
        address,
        number,
        complement,
        district,
        city,
        state,
        cep,
      });

      if (response === 200) {
        alert("Endereço atualizado com sucesso!");
      }
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.stepContent}>
            <h2>Dados Básicos</h2>
            <div className={styles.formGroup}>
              <label>Nome Fantasia</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🏪</span>
                <input
                  type="text"
                  placeholder="Ex: Abrigo Esperança"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>CNPJ</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>📄</span>
                <input
                  type="text"
                  placeholder="00.000.000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Celular</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📞</span>
                  <input
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                      if (v.length >= 10)
                        v = `${v.slice(0, 10)}-${v.slice(10, 14)}`;
                      setPhone(v);
                    }}
                    maxLength={15}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>✉️</span>
                  <input
                    type="email"
                    placeholder="contato@abrigo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.nextButton} onClick={nextStep}>
                Próximo <ArrowRightOutlined />
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Endereço</h2>
            <div className={styles.formGroup}>
              <label>Endereço</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Número</label>
                <div className={styles.numberInputContainer}>
                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    disabled={number === "S/N"}
                    placeholder="Número"
                  />
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={number === "S/N"}
                      onChange={(e) =>
                        setNumber(e.target.checked ? "S/N" : "")
                      }
                    />
                    S/N
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Complemento</label>
                <input
                  type="text"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Bairro</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Cidade</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Estado</label>
                <Select setStates={setState} />
              </div>
              <div className={styles.formGroup}>
                <label>CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </div>
            </div>
             <div className={styles.buttonContainer}>
              <button className={styles.nextButton} onClick={nextStep}>
                Próximo <ArrowRightOutlined />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Confirmação</h2>
            <p>Revise seus dados antes de salvar.</p>
            {/* Summary of data could go here */}
            <div className={styles.buttonContainer}>
              <button className={styles.saveButton} onClick={sendUpdateUser}>
                Salvar Alterações
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.stepItem} ${
              index <= currentStep ? styles.activeStep : ""
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepInfo}>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.stepDesc}>{step.description}</span>
            </div>
             {index < steps.length - 1 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>
      <div className={styles.contentArea}>{renderStepContent()}</div>
    </div>
  );
}

export default EditUser;
