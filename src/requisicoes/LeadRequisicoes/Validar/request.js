import axios from 'axios';
export function request(uri, token) {


  let url = process.env.REACT_APP_URL_API + uri;
 
  return  axios.post(url, { token }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

