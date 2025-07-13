import axios from 'axios';
import { getCurrentUser } from './auth.service';

const setupInterceptors = () => {
  axios.interceptors.request.use((config) => {
    const user = getCurrentUser();
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access here
      console.log("Unauthorized access - redirecting to login");
      // You can redirect to the login page or handle token refresh
    }
    return Promise.reject(error);
  });
};

export default setupInterceptors;
