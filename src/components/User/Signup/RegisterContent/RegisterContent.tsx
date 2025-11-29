import AddressService from "@/services/AddressService";
import UserService from "@/services/Users/UserServices";
import { useAddress } from "../Contexts/AddressContext";
import { useUser } from "../Contexts/UserContext,";
import { Code, Stack } from "@chakra-ui/react";
import styles from "./RegisterContent.module.css"

function RegisterContent() {
  const { name, email, password, phone } = useUser();
  const { address, number, complement, district, city, state, cep } =
    useAddress();

  const handleUser = async () => {
    const response = await UserService.registerUser({
      name: name,
      email: email,
      pass: password,
      celular: phone,
    });

    if (response == 201) {
      handleAddress();
    }
  };

  const handleAddress = async () => {
    const request = await AddressService.addAddress({
      address: address,
      number: number,
      complement: complement,
      distric: district,
      city: city,
      state: state,
      cep: cep,
    });

    if (request == 201) {
      window.location.href = "/menu";
    }
  };

  return (
    <div>
      <div>
        <h2>Dados da conta</h2>

        <h2>Nome: </h2>
        <p>{name}</p>

        <h2>Email: </h2>
        <p>{email}</p>

        <h2>Senha: </h2>
        <p>{password}</p>

        <h2>Celular: </h2>
        <p>{phone}</p>

        <button>Editar</button>

      </div>

      <div>
        <h2>Dados de Endereço</h2>

        <h2>Rua/lagradouro</h2>
        <p>{address}</p>

        <h2>Número</h2>
        <p>{number}</p>

        <h2>Complemento</h2>
        <p>{complement}</p>

        <h2>Bairro</h2>
        <p>{district}</p>

        <h2>Cidade</h2>
        <p>{city}</p>

        <h2>Estado</h2>
        <p>{state}</p>

        <h2>CEP</h2>
        <p>{cep}</p>

        <button>Editar</button>
      </div>

      <button onClick={handleUser}>Cadastrar</button>
    </div>
  );
}

export default RegisterContent;
