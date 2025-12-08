import AddressService from "@/services/AddressService";
import ShelterService from "@/services/ShelterService";
import { useEffect, useState } from "react";

type Props = {
  uuid_shelter: string;
};

function AlertAdopt({ uuid_shelter }: Props) {
  const [address, setAddress] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const handleShelter = async () => {
      const resposne = await ShelterService.getShelterByUUID(uuid_shelter);
        
      if (resposne !== "") {
        handleAddress(resposne.data.uuid);
      }
    };

    const handleAddress = async (uuid: string) => {
      const response = await AddressService.getAddressByShelter(uuid);

      if (response.status === 200) {
        setAddress(response.data.address);
      }
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
    </div>
  );
}

export default AlertAdopt;
