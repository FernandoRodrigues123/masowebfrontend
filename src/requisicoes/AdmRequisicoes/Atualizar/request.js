import axios from 'axios';

export function request(uri, dados, token) {
  const url = process.env.REACT_APP_URL_API + uri;
  return axios.put(url, dados, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
