import axios from "axios";

const url = "http://localhost:3000";

class UserService {
  static async registerUser(data: any) {
    const request = await axios.post(
      `${url}/user/create`,
      {
        name: data.name,
        email: data.email,
        pass: data.pass,
        celular: data.celular,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return request.data;
  }

  static async getURL(extension: string[], filename: string) {
    const request = await axios.post(
      `${url}/user/getURL`,
      {
        filename: filename,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": extension,
        },
      }
    );
    return request.status;
  }

  static async login(data: object) {
    const request = await axios.post(`${url}/user/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request.data;
  }
}

export default UserService;
