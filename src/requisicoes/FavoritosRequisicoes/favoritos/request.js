import axios from 'axios';
export function request(uri,token) {

  let url = process.env.REACT_APP_URL_API + uri;
  const response = axios.get(url,{
   headers:{'Authorization': `Bearer ${token}`}
  });

  return response;
}
export function requestFv(uri, token){
  return request(uri,token)
}
