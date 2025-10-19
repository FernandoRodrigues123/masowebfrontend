import axios from 'axios';
export function request(uri, dados,token) {
  console.log("request...")

  let url = process.env.REACT_APP_URL_API + uri;
  console.log("dados...")
  console.log(dados)
  console.log("token")
  console.log(token)
  const response = axios.post(url,dados,{
   headers:{'Authorization': `Bearer ${token}`}
  });
  console.log("response")
  console.log(response)

  return response;
}