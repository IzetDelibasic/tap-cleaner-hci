// -Axios-
import axios from "axios";
// -Environment-
import { environment } from "../environments/environments";

export const fetchUserData = async () => {
  try {
    const loggedInUserData = localStorage.getItem("loggedInUserData");

    if (!loggedInUserData) {
      console.error("Korisnički podaci nisu pronađeni u lokalnoj pohrani.");
      return null;
    }

    const parsedUserData = JSON.parse(loggedInUserData);
    const email = parsedUserData.email;
    const token = parsedUserData.jwtToken;

    if (!email || !token) {
      console.error("Email ili token nisu pronađeni u lokalnoj pohrani.");
      return null;
    }

    const response = await axios.post(
      `${environment.apiBaseUrl}/User/GetUserByEmail`,
      email,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka korisnika:", error);
    return null;
  }
};
