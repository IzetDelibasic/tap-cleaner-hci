// -Axios-
import axios from "axios";
// -Environment-
import { environment } from "../environments/environments";

export const fetchContainers = async (token) => {
  try {
    const response = await axios.get(
      `${environment.apiBaseUrl}/Container/GetContainers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch containers: ${error.message}`);
  }
};
