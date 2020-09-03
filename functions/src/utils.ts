import { AxiosError } from 'axios';
import { Detail } from './interfaces/joi.interface';

const Joi = require('joi');

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

export const validateField = (body: any) => {
  const schema = Joi.object({
    date: Joi.required(),
    fullName: Joi.required(),
    pwd: Joi.required(),
    lien: Joi.required(),
  });
  return schema.validate(body, { abortEarly: false});
};

export const extractErrorFromJoi = (details: Detail[]) => {
  let errorMessage = '';
  details.map(detail => errorMessage += detail.message + '\n');
  return errorMessage;
};
