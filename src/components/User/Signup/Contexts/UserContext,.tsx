import React, { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const UContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de <UserContext>");
  }
  return context;
};

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const value = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
  };

  return <UContext.Provider value={value}>{children}</UContext.Provider>;
};
