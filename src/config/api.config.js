import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'http://localhost:5001/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiConfig.interceptors.request.use(async config => {
  const getToken = await AsyncStorage.getItem('token');
  const token = JSON.parse(getToken);
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export {apiConfig};
