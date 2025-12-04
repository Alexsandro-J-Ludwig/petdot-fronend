import { triggerSnackbar } from "@/components/Recicle/Error/Error";
import axios from "axios";

const url = "https://petdot-backend.onrender.com";

class ShelterService {
  static async addShelter(data: any) {
    const request = await axios.post(
      `${url}/shelter/create`,
      {
        name: data.name,
        cnpj: data.cnpj,
        uuid_address: data.uuid_address,
        phonenumber: data.phone,
        email: data.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return request;
  }

  static async getShelterByUUID(uuid: string) {
    const request = await axios.get(`${url}/shelter/getByID/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (request.status !== 200) {
      triggerSnackbar(
        "Não foi possível pegar informações de abrigo. Teste novamente mais tarde"
      );
      return false;
    }

    return request.data;
  }

  static async getAllShelter(uuid: string) {
    const request = await axios.get(`${url}/shelter/getUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: uuid,
      },
    });

    return request;
  }

  static async deleteShelter(uuid: string) {
    const request = await axios.delete(`${url}/shelter/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return request.status;
  }

  static async editShelter(uuid: string, data: any) {
    const request = await axios.put(
      `${url}/shelter/${uuid}`,
      {
        name: data.name,
        cnpj: data.cnpj,
        description: "",
        uuid_address: data.uuid_address,
        phone: data.phone,
        email: data.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return request.status;
  }
}

export default ShelterService;
