import AddressService from "@/services/AddressService";
import ShelterService from "@/services/ShelterService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  uuid_shelter: string;
};

function AlertAdopt({ uuid_shelter }: Props) {
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleShelter = async () => {
      const resposne = await ShelterService.getShelterByUUID(uuid_shelter);

      if (resposne !== "") {
        handleAddress(resposne.data.uuid);
      }
    };

    const handleAddress = async (uuid: string) => {
      console.log("UUID de abrigo: ", uuid);

      const response = await AddressService.getAddressByShelter(uuid);
      console.log("Response: ", response);

      if (response.status === 200) {
        console.log("endereço: ", response.data.address);

        setAddress(response.data.address);
      }

      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    };

    handleShelter();

    const date = new Date();
    date.setDate(date.getDate() + 20);
    setDueDate(date.toLocaleDateString());
  }, [uuid_shelter]);

  return (
    <div>
      <h1>Parabens pela adoção!</h1>
      <p>Compareça neste endereço para resgatar seu amiguinho até</p>
      <p>{dueDate}</p>

      <div>
        <label>
          <span>{address}</span>
        </label>
      </div>

      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Confirmar
      </button>
    </div>
  );
}

export default AlertAdopt;
