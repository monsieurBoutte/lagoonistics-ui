import axios from 'axios';

export const fetchSensorData = async () => {
  try {
    const response = await axios.get("http://50ef6569.ngrok.io");
    return response.data;
  } catch (err) {
    throw err;
  }
}