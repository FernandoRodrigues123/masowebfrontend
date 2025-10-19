import axios from 'axios';
export function request(uri, dados) {
  let url = process.env.REACT_APP_URL_API + uri;
  const response = axios.post(url, dados);
  return response;
}