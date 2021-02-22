import React from 'react';

export function setAccounts(accounts) {
  return {
    type: 'SET_ACCOUNTS',
    accounts,
  };
}

export function setAccountBalance(account, balance) {
  return {
    type: 'SET_ACCOUNT_BALANCE',
    account,
    balance,
  };
}

export function setAccountTransactions(account, transactions) {
  return {
    type: 'SET_ACCOUNT_TRANSACTIONS',
    account,
    transactions,
  };
}

export function setProgressMessage(progressMessage) {
  return {
    type: 'SET_PROGRESS_MESSAGE',
    progressMessage,
  };
}
