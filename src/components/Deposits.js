import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { connect } from 'react-redux';
import SignUpLemi from './SignUpLeumi';
import { generateToken } from '../api/tokenApi';

import {
  getAccounts,
  getAccountBalance,
  getAccountTransaction,
} from '../api/accountsApi';
import {
  setAccounts,
  setProgressMessage,
} from '../redux/actions/accountsAction';
import { setToken } from '../redux/actions/loginAction';

import numberUtils from '../utils/numberFormat';
import currencyUtils from '../utils/currencyUtils';

import CircularProgress from '@material-ui/core/CircularProgress';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function Deposits(props) {
  const classes = useStyles();
  const [retriveData, setRetriveData] = useState(false);
  const [token, setToken] = useState('');

  console.log(`PROPS: ${JSON.stringify(props.accsessCode)}`)

  if (!props.accsessCode) {
    console.log(props);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <SignUpLemi />
      </div>
    );
  }

  if (!props.accounts) {
    if (!retriveData) {
      setRetriveData(true);
      retriveDataAction(props, token, setToken);
    }
    return (
      <React.Fragment style={{ width: '100%', backgroundColor: 'yellow' }}>
        {props.progressMessage ? (
          <Title>{props.progressMessage}</Title>
        ) : (
          <Title>מידע בדרך </Title>
        )}
        <div style={{ width: 500, backgroundColor: 'red' }}></div>

        <div>
          <CircularProgress />
        </div>
      </React.Fragment>
    );
  }

  if (!props.accounts[0].balances) {
    return (
      <React.Fragment style={{ width: '100%', backgroundColor: 'yellow' }}>
        {props.progressMessage ? (
          <Title>{props.progressMessage}</Title>
        ) : (
          <Title>מידע בדרך </Title>
        )}
        <div style={{ width: 500, backgroundColor: 'red' }}></div>

        <div>
          <CircularProgress />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Title>עובר ושב</Title>
      <Typography component="p" variant="h4">
        {numberUtils.formatNumber(
          props.accounts[0].balances[0].balanceAmount.amount,
          2
        )}{' '}
        {currencyUtils.convertToSymbol(props.accounts[0].balances[0].curremcy)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        יתרת סגירה
      </Typography>
      {props.accounts[0] && props.accounts[0].balances[1] && (
        <Typography component="p" variant="h6">
          {numberUtils.formatNumber(
            props.accounts[0].balances[1].balanceAmount.amount,
            2
          )}{' '}
          {currencyUtils.convertToSymbol(
            props.accounts[0].balances[1].curremcy
          )}
        </Typography>
      )}
      {props.accounts[0].balances[1] && (
        <Typography color="textSecondary" className={classes.depositContext}>
          יתרה משוערת
        </Typography>
      )}
    </React.Fragment>
  );
}

async function retriveDataAction(props, token, setToken) {
  if (!token) {
    let res = await generateToken(
      props.accsessCode,
      props.verifiier,
      props.clientId
    );
    token = res.access_token;
    setToken(res.access_token);
  }

  props.setProgressMessage('מביא מידע על חשבונות');
  let accounts = await getAccounts(token, props.consentId);
  console.log(`ACCOUNTS: ${JSON.stringify(accounts)}`);
  if (accounts && accounts.length > 0) {
    let accountsBalancses = await Promise.all(
      accounts.map(async account => {
        props.setProgressMessage('מביא מידע על מאזן חשבונות');
        let balances = await getAccountBalance(
          token,
          props.consentId,
          account.resourceId
        );
        account.balances = balances;
        props.setProgressMessage('מביא מידע על פירוט תנועות');
        account.transactions = await getAccountTransaction(
          token,
          props.consentId
        );
        return account;
      })
    );
    console.log(`ACCOUNTS-BALANCES: ${JSON.stringify(accountsBalancses)}`);
    props.setAccounts(accountsBalancses);
    // setRetriveData(false);
  }
  // setRetriveData(false)
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
    accounts: state.accountsReducer.accounts,
    validConsent: state.loginReducer.validConsent,
    progressMessage: state.accountsReducer.progressMessage,
    consentId: state.loginReducer.consentId,
    clientId: state.loginReducer.clientId,
  };
};

const mapDispatchToProps = {
  setAccounts,
  setProgressMessage,
  setToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(Deposits);
