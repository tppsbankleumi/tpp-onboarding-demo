import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
let AWS = require('aws-sdk');
AWS.config.region = process.env.REACT_APP_REIGON;
AWS.config.credentials = {};
AWS.config.credentials.accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = process.env.REACT_APP_AWS_SEVERET;

//TODO: Should be deployed as a dedicated lambda with its own gateway
export function createToken(user, password) {}

function lambdify(statusCode, body) {
  return {
    statusCode: statusCode,
    isBase64Encoded: false,
    headers: {},
    body: JSON.stringify(body),
  };
}

// export async function createToken(user, password){

//     var params = {
//         FunctionName: 'arn:aws:lambda:eu-west-1:340693423389:function:auth-AuthLambda-1MES4KXH9I65T',
//         InvocationType: 'RequestResponse',
//         LogType: 'Tail',
//         Payload: JSON.stringify({
//             queryStringParameters: {
//                 user: user,
//                 secret: password
//             }
//         })
//     };
//     console.log(JSON.stringify(params))
//     let response =  await invokeLamda(params);
//     let payload = JSON.parse(response.Payload);
//     let body = JSON.parse(payload.body);
//     return body;
//   }

//  async  function  invokeLamda(params){
//    let respinse = await fetch('https://api.github.com/users/hacktivist123/repos')
//     var lambda = new AWS.Lambda();
//     return respinse
//   }
