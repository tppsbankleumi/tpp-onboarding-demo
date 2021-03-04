import React, { useEffect, useReducer, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {
  v,
  setConsentParameters,
  setToken,
  setVerifiier,
  setClientId,
  setConsentId,
} from '../redux/actions/loginAction';
import Title from './Title';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  createConsent,
  approveConsnet,
  getConsentDiscovery,
} from '../api/consentApi';
import { createVerifier, createChallenge } from '../utils/auth-utils';
import configData from '../config.json';

async function doAction(props, setShowProgress) {
  setShowProgress(true);
  let consent = await createConsent(configData['deafult-psu']);
  console.log(`CONSENT: ${JSON.stringify(consent)}`);
  let consentDiscovery = await getConsentDiscovery(configData['deafult-psu']);
  const authorizationEndpoint = JSON.parse(consentDiscovery.data.body)
    .authorization_endpoint;
  setShowProgress(false);
  let verifiier = createVerifier();
  let codeChallenge = createChallenge(verifiier);
  props.setVerifiier(verifiier);
  props.setClientId(consent.data.tpp_id);
  props.setConsentId(consent.data.consentId);

  //TDOD call discovery
  window.location.assign(
    `${configData['leumi-login-app']}/login?codeChallenge=${codeChallenge}&consentId=${consent.data.consentId}&redirectUri=${authorizationEndpoint}&tppId=${consent.data.tpp_id}`
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SignupLeumi(props) {
  const [showProgress, setShowProgress] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  const history = useHistory();
  let query = useQuery();

  let consentId = query.get('consentId') || props.consentId;
  let accsessCode = query.get('code') || props.accsessCode;
  if (consentId && accsessCode) {
    return <div></div>;
  }

  if (!props.validConsent) {
    return (
      <React.Fragment style={{ width: '100%', backgroundColor: 'yellow' }}>
        {progressMessage ? (
          <Title>{progressMessage}</Title>
        ) : (
          <Title> מידע לא קיים</Title>
        )}
        <div style={{ width: 500, backgroundColor: 'red' }}></div>

        {props.showAccept && (
          <div>
            {showProgress ? (
              <CircularProgress />
            ) : (
              <div>
                <Title>עליך לתת את הסכמתך כדי לקבל את המידע שלך מלאומי</Title>
                <Button
                  fullWidth
                  disabled={progressMessage}
                  variant="contained"
                  id="login"
                  color="primary"
                  onClick={doAction.bind(this, props, setShowProgress)}
                >
                  תן הסכמה
                </Button>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
  return <div></div>;
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
    consentId: state.loginReducer.consentId,
    accsessCode: state.loginReducer.accsessCode,
  };
};

const mapDispatchToProps = {
  setConsentParameters,
  setToken,
  setVerifiier,
  setClientId,
  setConsentId,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupLeumi);
