import axios from "axios";

const url = "http://localhost:3000";

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

  static async getAllShelter(uuid: string) {
    const request = await axios.get(`${url}/shelter/getUser`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": uuid
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
