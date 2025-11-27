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

  static async getAllAnimals(uuid: string) {}

  static async getAnimal(uuid: string) {}

  static async getAnimalByShelter(uuid: string) {
    const request = await axios.get(`${url}/animal/getByShelter/${uuid}`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    return request
  }

  static async editAnimal(uuid: string, data: any) {
    const response = await axios.put(`${url}/animal/${uuid}`, {
      data
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })

    return response;
  }

  static async deleteAnimal(uuid: string) {
    const response = await axios.delete(`${url}/animal/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      }
    })
    
    return response
  }
}

export default AnimalService;
