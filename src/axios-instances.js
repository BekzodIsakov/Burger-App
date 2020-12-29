import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-my-burger-7d8f7-default-rtdb.firebaseio.com',
});

export default axiosInstance;
