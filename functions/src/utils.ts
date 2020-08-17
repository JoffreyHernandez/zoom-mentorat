import { AxiosError } from 'axios';

export const axiosErrorHandle = (error: AxiosError) => {
  if (error.response) {
    console.log('Response error');
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log('Request error');
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
};
