import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { JoiValidation } from './interfaces/joi.interface';
import { oAuthToken } from './oauthToken';
import { sendEmail } from './sendGrid';
import { extractErrorFromJoi, validateField } from './utils';

const app = express();
export const node = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post('/oauth-token', bodyParser.raw({ type: 'application/json' }),
  (request, response) =>
    oAuthToken(request, response),
);

app.post('/send-email', bodyParser.raw({ type: 'application/json' }),
  async (request, response) => {
    const joiValidation: JoiValidation = validateField(request.body);
    if (joiValidation.error) {
      const extractError = extractErrorFromJoi(joiValidation.error.details);
      response.status(400);
      response.send(extractError);
    } else {
      const result = await sendEmail(request.body);
      console.log('result => ' + result);
      response.send(result).status(204);
    }
  });

node.use('/api/v1', app);
node.use(bodyParser.urlencoded({ extended: false }));

export const webApi = functions.https.onRequest(node);
