import axios from "axios";

const url = "https://petdot-backend.onrender.com";

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

  // static async getURL(extension: string[], filename: string) {
  static async getURL(extension: string, filename: string) {
    const request = await axios.post(
      `${url}/user/getURL`,
      {
        filename: filename,
        contentType: extension,
      },
      {
        withCredentials: true,
        headers: {
          // "Content-Type": extension,
          "Content-Type": "application/json",
        },
      }
    );
    
    return request.data;
  }

  static async login(data: any) {
    const request = await axios.post(
      `${url}/user/get`,
      {
        email: data.email,
        pass: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return request.data;
  }

  static async sendImage(imageURL: string, file: any, contentType: string) {
    const request = await axios.put(`${imageURL}`, file, {
      headers: {
        "Content-Type": contentType
      }
    });

    return request.status
  }
}

export default UserService;
