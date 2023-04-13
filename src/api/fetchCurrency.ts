import axios from 'axios';
const API_KEY = '7149c6b6e5d6806333385a3f7f77220a6e2041350a9d802453b33eb319bb';

export const fetchCurrency = async () => {
  try {
    const { data } = await axios.get('https://api.cryptorank.io/v1/currencies?api_key=' + API_KEY);

    return data;
  } catch (err) {
    console.log('ошибка:', err);
  }
};
