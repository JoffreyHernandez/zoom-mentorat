import axios, { AxiosResponse } from 'axios';
import { axiosErrorHandle } from './utils';

export  const oAuthToken = async (request: any, response: any) => {
  const { authorization, code, redirectURL } = request.body;
  const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectURL}`;
  const body = { code, redirectURL };
  const header = {
    headers: {
      Authorization: 'Basic ' + authorization
    }
  };
  const retour: AxiosResponse = await axios.post(url, body, header).catch(error => {
    axiosErrorHandle(error);
    return response.status(400).send(`Error: ${error}`);
  });
  console.log('out => ' + retour.data);
  return response.json(retour.data);
}
