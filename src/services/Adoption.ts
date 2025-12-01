import axios from "axios";

const url = "https://petdot-backend.onrender.com";

class AdoptionsService {
  static async register(data: any) {
    console.log(data);

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
}

export default AdoptionsService;
