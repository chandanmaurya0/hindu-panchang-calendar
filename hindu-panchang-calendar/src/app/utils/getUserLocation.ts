import axios from "axios";

const getUserLocation = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user location", error);
    return null;
  }
}


export default getUserLocation;