import axios from 'axios';
export function request(uri, dados) {
 

  let url = process.env.REACT_APP_URL_API + uri;

  return axios.post(url, dados)
}

