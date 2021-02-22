import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import { connect } from 'react-redux';
import SignUpLemi from './SignUpLeumi';
import CircularProgress from '@material-ui/core/CircularProgress';
import dateUtils from '../utils/dateUtils';

function Chart(props) {
  console.log(`Chart PROPS: ${props.accsessCode} `)
  const theme = useTheme();
  if (!props.accsessCode) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <SignUpLemi showAccept />
      </div>
    );
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
  let presentationTransactions = transactions.map(transaction => {
    let time = dateUtils.dateFormaterMonth(transaction.bookingDate);
    let amount = parseInt(transaction.transactionAmount.amount);
    return { time, amount };
  });

  return (
    <React.Fragment>
      <Title> העברות האחרונות שלי</Title>
      <ResponsiveContainer>
        <LineChart
          data={presentationTransactions.slice(0, 10)}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            style={{ fontSize: 16 }}
            dataKey="time"
            stroke={theme.palette.text.secondary}
          />
          <YAxis
            style={{ fontSize: 16 }}
            dx={-40}
            stroke={theme.palette.text.secondary}
          >
            <Label
              angle={270}
              position="left"
              style={{
                fontSize: 18,
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
              }}
            >
              {reverse(' העברות ₪')}
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

function reverse(str) {
  let reversed = '';
  for (var i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
    validConsent: state.loginReducer.validConsent,
    accounts: state.accountsReducer.accounts,
    progressMessage: state.accountsReducer.progressMessage,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
