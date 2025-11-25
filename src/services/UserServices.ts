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

    return request.status;
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
        pass: data.pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return request.status;
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
