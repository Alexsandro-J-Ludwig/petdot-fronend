import axios from "axios";

const url = "http://localhost:3000";

class AnimalService {
  static async addShelter(data: any) {
    const request = await axios.post(
      `${url}/animal/`,
      {
        name: data.name,
        redemption_date: data.birth,
        species: data.species,
        race: data.breed,
        gender: data.gender,
        vaccines: data.vacines,
        uuid_shelter: data.shelterUUID,
        description: "",
        imageURL: data.imageURL,
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

  static async getURL(data: any) {
    const request = await axios.get(`${url}/animal/url/${data.filename}`, {
      headers: {
        "Content-Type": data.type,
        Authorization: localStorage.getItem("token"),
      },
    });

    return request;
  }

  static async sendImage(link: string, file: File) {
    const request = await axios.put(link, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return request.status;
  }
}

export default AnimalService;
