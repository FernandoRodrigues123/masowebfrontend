import axios from 'axios';
export function request(uri) {
 console.log(uri)
  let url = process.env.REACT_APP_URL_API + uri;

  return axios.get(url)
}

