import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DashBoard from './Dashboard';
import { setToken, setConsent } from '../redux/actions/loginAction';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home(props) {
  const history = useHistory();
  let query = useQuery();

  if (!props.token) {
    history.push('./login');
  }
  let consentId = query.get('consentId') || props.consentId;
  let accsessCode = query.get('code') || props.accsessCode;
  if (consentId && accsessCode) {
    if (!props.accsessCode) {
      props.setConsent(consentId, accsessCode);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <DashBoard />
      </header>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
  };
};

const mapDispatchToProps = {
  setToken,
  setConsent,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
