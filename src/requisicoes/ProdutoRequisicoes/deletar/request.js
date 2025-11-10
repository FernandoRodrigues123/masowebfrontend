import axios from 'axios';

export function request(uri, token) {
  console.log(token)
  let url = process.env.REACT_APP_URL_API + uri;

  return axios.delete(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }}
  )

}
