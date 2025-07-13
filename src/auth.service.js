import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

export const login = (email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password,
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
    }
    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem('user'); // Remove user data from localStorage
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')); // Get current user from localStorage
};
