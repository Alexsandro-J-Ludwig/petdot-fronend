import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface Address {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  complement: string;
  setComplement: React.Dispatch<React.SetStateAction<string>>;
  district: string;
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  cep: string;
  setCep: React.Dispatch<React.SetStateAction<string>>;
}

export const AContext = createContext<Address | null>(null);

export const useAddress = () => {
  const context = useContext(AContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de <UserContext>");
  }
  return context;
};

export const AddressContext = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");

  const value = {
    address,
    setAddress,
    number,
    setNumber,
    complement,
    setComplement,
    district,
    setDistrict,
    city,
    setCity,
    state,
    setState,
    cep,
    setCep,
  };

  return <AContext.Provider value={value}>{children}</AContext.Provider>;
};
