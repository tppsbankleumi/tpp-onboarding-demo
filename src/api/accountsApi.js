//TODO: Restore const utils = require('../../common/utils'); when I figure out how to reuse this properly
import * as React from 'react';

import axios from 'axios';
import configData from '../config.json';

const ACCOUNTS_API = 'http://localhost:3000/accounts/${token}/${consentId}'; // dev;
const BALANCES_API = 'http://localhost:3000/balances/${token}/${consentId}'; // dev;
const TRANSACTIONS_API =
  'http://localhost:3000/transacrtions/${token}/${consentId}/340477c5-f088-4d5d-9dcc-e7adf27547b5'; // dev;

export async function getAccounts(token, consentId) {
  let response;
  try {
    response = await callAccounts(token, consentId);
    return response.data.accounts;
  } catch (error) {
    return error;
  }
}

async function callAccounts(token, consentId) {
  let consentUrl = ACCOUNTS_API.replace('${token}', token).replace(
    '${consentId}',
    consentId
  );
  return new Promise((resolve, reject) => {
    axios.get(consentUrl).then(response => {
      resolve(response);
    });
  });
}

export async function getAccountBalance(token, consentId, resourceId) {
  let response;
  try {
    response = await callAccountsBalances(token, consentId, resourceId);
    console.log(`getAccountBalance response: ${response}`);
    return response;
  } catch (error) {
    return error;
  }
}

async function callAccountsBalances(token, consentId, resourceId) {
  let balancesUrl = BALANCES_API.replace('${token}', token).replace(
    '${consentId}',
    consentId
  );
  console.log(`balancesUrl: ${balancesUrl}`);
  return new Promise((resolve, reject) => {
    axios.get(balancesUrl).then(response => {
      resolve(response.data.balances);
    });
  });
}

export async function getAccountTransaction(token, consentId) {
  let response = await callAccountsTransactions(token, consentId);
  return response.transactions;
}

function callAccountsTransactions(token, consentId) {
  return new Promise((resolve, reject) => {
    let transacrtionsUrl = TRANSACTIONS_API.replace('${token}', token).replace(
      '${consentId}',
      consentId
    );

    console.log(`transacrtionsUrl: ${transacrtionsUrl}`);
    axios
      .get(`${transacrtionsUrl}`)
      .then(res => {
        console.log(res);
        console.log('transactions',res.data.transactions);
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.response);
        reject('failed');
      });
  });
}
