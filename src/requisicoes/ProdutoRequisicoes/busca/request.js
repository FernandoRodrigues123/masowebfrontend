import axios from 'axios';
export function request(uri) {
 
  let url = process.env.REACT_APP_URL_API + uri;

  return axios.get(url)
}

