//TODO: Restore const utils = require('../../common/utils'); when I figure out how to reuse this properly
import * as React from 'react';
import { createChallenge, createVerifier } from '../utils/auth-utils';
import { manageRequestResponse } from '../utils/api-utils';
import axios from 'axios';
import configData from '../config.json';

const CONSENT_API = 'http://localhost:3000/consents/${psuid}'; // dev;

const CONSENT_DISCOVERY_API =
  'http://localhost:3000/consents/discovery/${psuid}';

const CODEVERYFIER_API = 'http://localhost:3000/getCodeVerifier';

export async function createConsent(psuid) {
  let response;
  try {
    response = await callConsent(psuid);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCodeVerifier() {
  let response;
  try {
    response = await callGetCodeVerifier();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getConsentDiscovery(psuid) {
  let response;
  try {
    response = await callConsentDiscovery(psuid);
    return response;
  } catch (error) {
    return error;
  }
}

async function callConsent(psuid) {
  let consentUrl = CONSENT_API.replace('${psuid}', psuid);
  return new Promise((resolve, reject) => {
    axios.get(consentUrl).then(response => {
      resolve(response);
    });
  });
}

async function callGetCodeVerifier() {
  let codeVerifierUrl = CODEVERYFIER_API;
  return new Promise((resolve, reject) => {
    axios.get(codeVerifierUrl).then(response => {
      resolve(response);
    });
  });
}

async function callConsentDiscovery(psuid) {
  let consentUrl = CONSENT_DISCOVERY_API.replace('${psuid}', psuid);
  return new Promise((resolve, reject) => {
    axios.get(consentUrl).then(response => {
      resolve(response);
    });
  });
}
