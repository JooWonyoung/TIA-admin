import axios from 'axios';
const url = process.env.REACT_APP_PUBLIC_API_URL;

export async function getPreRsrvApi(payload) {
  const token = localStorage.getItem('login-token');
  return await axios.get(url + '/pre-reservation/advance', {
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getNationApi() {
  const token = localStorage.getItem('login-token');
  return await axios.get(url + '/reservation/getNation', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getChannelApi() {
  const token = localStorage.getItem('login-token');
  return await axios.get(url + '/reservation/channel_list', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getPreRsrvUserApi(payload) {
  const token = localStorage.getItem('login-token');
  return await axios.get(url + '/pre-reservation/users', {
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
