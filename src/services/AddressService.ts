import axios from "axios";

const url = "http://localhost:3000";

class AddressService {
  static async addAddress(data: any) {
    const request = await axios.post(
      `${url}/address/create`,
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
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return request.status;
  }
}

export default AddressService;
