import axios from 'axios';

// Consider putting this in a config file
const API_BASE_URL = 'https://11b0-138-121-121-66.ngrok-free.app';

export default async function FiltrarListaEvento(page: number, limit: number, filtro: number, search: string) {
  if(filtro === 0){


  try {
    const response = await axios({
      method: 'post',
      url: `${API_BASE_URL}/api/evento/filter/${page}/${limit}`,
      responseType: 'json',
      headers: {
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        tg: search,
        nome_cliente: '',
        evento: ''
      }
    })
    console.log(response)
    // Typically you only need the data part of the response
    return response.data;

  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response:', error.response.status, error.response.data);
      throw new Error(`Server responded with status ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message);
      throw new Error('Failed to make request');
    }
  } }
  else if (filtro === 1){


    try {
      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/api/evento/filter/${page}/${limit}`,
        responseType: 'json',
        headers: {
          "ngrok-skip-browser-warning": "69420"
        },
        data: {
          tg: '',
          nome_cliente: search,
          evento: '',
        }
      })
      console.log(response)
      // Typically you only need the data part of the response
      return response.data;

    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response.status, error.response.data);
        throw new Error(`Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request
        console.error('Request error:', error.message);
        throw new Error('Failed to make request');
      }
    } }
  else if (filtro === 2){


    try {
      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/api/evento/filter/${page}/${limit}`,
        responseType: 'json',
        headers: {
          "ngrok-skip-browser-warning": "69420"
        },
        data: {
          tg: '',
          nome_cliente: '',
          evento: search,
        }
      })
      console.log(response)
      // Typically you only need the data part of the response
      return response.data;

    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response.status, error.response.data);
        throw new Error(`Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request
        console.error('Request error:', error.message);
        throw new Error('Failed to make request');
      }
    } }
}
