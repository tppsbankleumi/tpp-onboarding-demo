import React from 'react';

export function setToken(token) {
  return {
    type: 'SET_TOKEN',
    token,
  };
}

export function setVerifiier(verifiier) {
  return {
    type: 'SET_VERIFIIER',
    verifiier,
  };
}

export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId,
  };
}

export function setConsentId(consentId) {
  return {
    type: 'SET_CONSENT_ID',
    consentId,
  };
}

export function setConsent(consentId, accsessCode, verifier) {
  return {
    type: 'SET_CONSENT',
    consentId,
    accsessCode,
    verifier,
  };
}

export function setConsentParameters(messageId, transactionId, clientId) {
  return {
    type: 'SET_CONSENT_PARAMS',
    messageId,
    transactionId,
    clientId,
  };
}

export function logout() {
  return {
    type: 'LOG_OUT',
  };
}
