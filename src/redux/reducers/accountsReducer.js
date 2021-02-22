import React from 'react';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  accounts: '',
  accountsBalance: {},
  accountsTransactions: {},
  progressMessage: '',
};
export default function accountReducer(state = initialState, action) {
  if (action.type === REHYDRATE) {
    const savedData = action.payload || initialState;
    return {
      ...state,
      ...savedData.accountsReducer,
    };
  }
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return Object.assign({}, state, {
        accounts: action.accounts,
      });
    case 'SET_PROGRESS_MESSAGE':
      return Object.assign({}, state, {
        progressMessage: action.progressMessage,
      });

    case 'SET_ACCOUNT_BALANCE':
      let accountsBalance = state.accountsBalance;
      accountsBalance[action.account] = action.balance;
      return Object.assign({}, state, {
        accountsBalance: accountsBalance,
      });

    case 'SET_ACCOUNT_TRANSACTIONS':
      let accountsTransactions = state.accountsTransactions;
      accountsTransactions[action.account] = action.transactions;
      return Object.assign({}, state, {
        accountsTransactions: accountsTransactions,
      });

    case 'LOG_OUT':
      return Object.assign({}, state, {
        accounts: '',
        accountsBalance: '',
        accountsTransactions: '',
      });

    default:
      return state;
  }
}
