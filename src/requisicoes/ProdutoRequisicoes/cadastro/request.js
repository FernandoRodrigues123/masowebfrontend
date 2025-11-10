import axios from 'axios';
export function request(uri, dados,token) {
console.log(dados)
console.log(token)
  let url = process.env.REACT_APP_URL_API + uri;
  const response = axios.post(url,dados,{
   headers:{'Authorization': `Bearer ${token}`}
  });

  return response;
}