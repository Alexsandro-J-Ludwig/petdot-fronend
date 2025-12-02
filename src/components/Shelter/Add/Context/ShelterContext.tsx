import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface Shelter {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  cnpj: string;
  setCnpj: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const SContext = createContext<Shelter | null>(null);

export const useShelter = () => {
  const context = useContext(SContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de <UserContext>");
  }
  return context;
};

export const ShelterContext = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const value = {
    name,
    setName,
    cnpj,
    setCnpj,
    phone,
    setPhone,
    email,
    setEmail,
  };

  return <SContext.Provider value={value}>{children}</SContext.Provider>;
};
