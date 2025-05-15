import axios from 'axios'

const API_BASE_URL = 'https://11b0-138-121-121-66.ngrok-free.app';
export default async function GetDataCliente(codigo_cliente: string) {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_BASE_URL}/api/cliente/datas/${codigo_cliente}`,
      responseType: 'json',
      headers: {
        "ngrok-skip-browser-warning": "69420"
      },
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
  }
}
