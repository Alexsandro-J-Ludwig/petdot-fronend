import axios from "axios";

const url = "https://petdot-backend.onrender.com";

class AddressService {
  static async addAddress(data: any) {
    console.log(data);
    
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

  static async getAddress(uuid?: string) {
    const request = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: uuid,
      },
    });

    return request.data;
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
