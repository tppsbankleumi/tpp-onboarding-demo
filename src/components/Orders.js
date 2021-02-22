import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import SignUpLemi from './SignUpLeumi';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import numberUtils from '../utils/numberFormat';
import currencyUtils from '../utils/currencyUtils';
import dateUtils from '../utils/dateUtils';

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function reverse(str) {
  if (!str) {
    return str;
  }
  let reversed = '';
  for (var i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

function Orders(props) {
  const classes = useStyles();
  if (!props.accsessCode) {
    return <SignUpLemi />;
  }

  if (!props.accounts) {
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

  if (!props.accounts[0].transactions) {
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
  let transactions = props.accounts[0].transactions.booked;
  transactions = transactions.filter(
    transaction => parseInt(transaction.transactionAmount.amount) > 0
  );
  let presentationTransactions = transactions
    .map(transaction => {
      return {
        date: dateUtils.dateFormater(transaction.bookingDate),
        amount: `${numberUtils.formatNumber(
          transaction.transactionAmount.amount
        )} ${currencyUtils.convertToSymbol(
          transaction.transactionAmount.currency
        )}`,
        description: transaction.remittanceInformationUnstructured,
      };
    })
    .slice(0, 5);
  return (
    <div dir="rtl">
      <React.Fragment>
        <Title>פעולות עובר ושב</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">תאריך</TableCell>
              <TableCell align="right">הפעולה</TableCell>
              <TableCell align="right">סכום הפעולה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presentationTransactions.map(row => (
              <TableRow key={row.id}>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
    progressMessage: state.accountsReducer.progressMessage,
    validConsent: state.loginReducer.validConsent,
    accounts: state.accountsReducer.accounts,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
