import { triggerSnackbar } from "@/components/Recicle/Error/Error";
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", `Bearer ${request.data.data}`);
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
        headers: {
          // "Content-Type": extension,
          Authorization: localStorage.getItem("token"),
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
      }
    );

    localStorage.setItem("token", `Bearer ${request.data.data}`);
    return request.status;
  }

  static async getInfo() {
    const request = await axios.get(`${url}/user`, {
      headers: {
        "Content-Type": "applciation/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (request.status !== 200) {
      triggerSnackbar(
        "Não foi possível pegar informações e usuário. Tente novamente mais tarde "
      );
      return false;
    }

    return request.data;
  }

  static async updateUser(data: any) {
    const request = await axios.put(
      `${url}/user/update`,
      {
        name: data.name,
        email: data.email,
        pass: data.pass,
        celular: data.celular,
        nivel_acesso: data.nivel_acesso,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (request.data.data != "") {
      localStorage.removeItem("token");
    }

    return request.status;
  }

  static async me() {
    const request = await axios.get(`${url}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return request;
  }

  static async deleteAccount() {
    const response = await axios.delete(`${url}/user/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return response;
  }
}

export default UserService;
