import * as React from 'react';
import configData from '../config.json';
import axios from 'axios';

const TOKEN_API = 'http://localhost:3000/token/:verifier/:code/:clientId'; // dev;

export async function generateToken(code, code_verifier, clientId) {
  console.log(
    `generateToken: code- ${code}, code_verifier-${code_verifier}, clientId-${clientId}`
  );
  let tokenApi = TOKEN_API.replace(':verifier', code_verifier)
    .replace(':code', code)
    .replace(':clientId', clientId);
  return new Promise((resolve, reject) => {
    axios.get(tokenApi).then(response => {
      resolve(response.data);
    });
  });
}
