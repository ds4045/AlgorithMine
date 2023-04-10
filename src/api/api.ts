import axios from 'axios';

export const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});
