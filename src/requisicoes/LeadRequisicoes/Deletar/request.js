import axios from 'axios';

export function request(uri, token) {
  
  let url = process.env.REACT_APP_URL_API + uri;

  axios.delete(url, {
    'Authorization': `Bearer ${token}`
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
    });
}
