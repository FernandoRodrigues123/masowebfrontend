import axios from 'axios';

export function request(uri, login, token) {
  const url = process.env.REACT_APP_URL_API + uri;
  return axios.get(url, {
    params: { login }, // 
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}
