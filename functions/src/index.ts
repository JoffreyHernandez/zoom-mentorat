import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { oAuthToken } from './oauthToken';

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
    oAuthToken(request, response)
);

node.use('/api/v1', app);
node.use(bodyParser.urlencoded({ extended: false }));

export const webApi = functions.https.onRequest(node);
