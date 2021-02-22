import React from 'react';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  token: '',
  consentId: '',
  transactionId: '',
  messageId: '',
  clientId: '',
  verifiier: '',
  accsessCode: '',
  validConsent: false,
};
export default function loginReducer(state = initialState, action) {
  if (action.type === REHYDRATE) {
    const savedData = action.payload || initialState;
    return {
      ...state,
      ...savedData.loginReducer,
    };
  }
  switch (action.type) {
    case 'SET_TOKEN':
      return Object.assign({}, state, {
        token: action.token,
      });
    case 'SET_CONSENT_ID':
      return Object.assign({}, state, {
        consentId: action.consentId,
      });
    case 'SET_CLIENT_ID':
      return Object.assign({}, state, {
        clientId: action.clientId,
      });
    case 'SET_VERIFIIER':
      return Object.assign({}, state, {
        verifiier: action.verifiier,
      });
    case 'SET_CONSENT':
      return Object.assign({}, state, {
        consentId: action.consentId,
        accsessCode: action.accsessCode,
        verifier: action.verifier,
        validConsent: action.consentToken ? true : false,
      });

    case 'SET_CONSENT_PARAMS':
      return Object.assign({}, state, {
        messageId: action.messageId,
        transactionId: action.transactionId,
        clientId: action.clientId,
      });

    case 'LOG_OUT':
      return Object.assign({}, state, {
        token: '',
        consentId: '',
        transactionId: '',
        verifier: '',
        accsessCode: '',
        clientId: '',
        messageId: '',
        validConsent: false,
      });

    default:
      return state;
  }
}
