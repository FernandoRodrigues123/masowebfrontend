import axios from 'axios';
export function request(uri,login, token) {
 

  let url = process.env.REACT_APP_URL_API + uri;

  return axios.get(url,login, {
   headers:{'Authorization': `Bearer ${token}`}
  })
}
