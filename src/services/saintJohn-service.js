import axios from 'axios';

export const fetchSaintJohnSensors = async () => {
  try {
    const request = await axios.get('http://localhost:4010/saint-john');
    return request.data;
  } catch (error) {
    throw error;
  }
}