import axios from 'axios';
const url = process.env.REACT_APP_PUBLIC_API_URL;

export async function getUsersApi(payload) {
  const token = localStorage.getItem('login-token');
  return await axios.get(url + '/user', {
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
