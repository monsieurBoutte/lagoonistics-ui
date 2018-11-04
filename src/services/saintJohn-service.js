import axios from 'axios';

export const fetchSaintJohnSensors = async () => {
  try {
    const request = await axios.get('http://50ef6569.ngrok.io/saint-john');
    return request.data;
  } catch (error) {
    throw error;
  }
}