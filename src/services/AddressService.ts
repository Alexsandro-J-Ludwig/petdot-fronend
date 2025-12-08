import { triggerSnackbar } from "@/components/Recicle/Error/Error";
import axios from "axios";

const url = "https://petdot-backend.onrender.com";

class AddressService {
  static async addAddress(data: any) {
    const request = await axios.post(
      `${url}/address/create`,
      {
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        cep: data.cep,
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

  static async addAddressShelter(data: any) {
    const request = await axios.post(
      `${url}/address/create/shelter`,
      {
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        cep: data.cep,
        uuid: data.uuid,
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

  static async getAddress(uuid?: string) {
    const request = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: uuid,
      },
    });

    return request.data;
  }

  static async getAddressByuser() {
    const response = await axios.get(`${url}/address/get/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      triggerSnackbar(
        "Não foi possível coletar informações de endereço. Tente denovo mais tarde"
      );
      return false;
    }

    return response.data;
  }

  static async getAddressByShelter(uuid: string) {    
    const request = await axios.get(`${url}/address/get/shelter/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return request;
  }

  static async editAddress(uuid: string, data: any) {
    const request = await axios.put(
      `${url}/address/update/${uuid}`,
      {
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.district,
        city: data.city,
        state: data.state,
        cep: data.cep,
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

  static async deleteAddress(uuid: string) {
    const request = await axios.delete(`${url}/address/delete/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return request.status;
  }
}

export default AddressService;
