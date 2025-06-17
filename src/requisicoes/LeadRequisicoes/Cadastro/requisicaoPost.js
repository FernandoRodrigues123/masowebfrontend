import axios from 'axios';


export function request(uri, dados) {

  let url = process.env.REACT_APP_URL_API + uri;

  axios.post(url, dados)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
    });
}
