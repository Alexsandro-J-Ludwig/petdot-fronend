import { triggerSnackbar } from "@/components/Recicle/Error/Error";
import axios from "axios";

const url = "https://petdot-backend.onrender.com";

class AdoptionsService {
  static async register(data: any) {
    const response = await axios.post(
      `${url}/adoption/create`,
      {
        uuid_animal: data.uuid,
        uuid_shelter: data.uuidShelter,
        adoption_date: new Date(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return response;
  }

  static async getByUser() {
    const response = await axios.get(`${url}/adoption/getByUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      triggerSnackbar(
        "Não foi possível pegar os dados de adoção. Tente novamente mais tarde"
      );
    }

    return response.data
  }

  static async delete(uuid: string) {
    const response = await axios.delete(`${url}/adoption/admin/deletar/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      triggerSnackbar(
        "Não foi possível pegar os dados de adoção. Tente novamente mais tarde"
      );
    }

    return response.data
  }
}

export default AdoptionsService;
