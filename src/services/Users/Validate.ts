import UserService from "./UserServices";

export async function Validator() {
  try {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  } catch (err) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}
