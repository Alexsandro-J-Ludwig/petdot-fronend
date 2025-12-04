import UserService from "./UserServices";
import { useNavigate } from "react-router-dom";

export async function Validator() {
  const navigate = useNavigate();
  try {
    const response = await UserService.me();

    if (response.status !== 200) {
      localStorage.removeItem("token");
      navigate("/");
    }
  } catch (err) {
    localStorage.removeItem("token");
    navigate("/");
  }
}
