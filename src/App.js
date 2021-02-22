import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import { PersistGate } from 'redux-persist/integration/react';
import CreateStore from './redux/store';
import Login from './components/login';
import Registration from './components/psuRegistration';
import SignUp from './components/SignUpLeumi';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const { store, persistor } = CreateStore();

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App(props) {
  return (
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div dir="rtl">
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/token">
                  <SignUp />
                </Route>

                <Route path="/signUp">
                  <SignUp />
                </Route>
                <Route path="/registration">
                  <Registration />
                </Route>

                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </PersistGate>
      </StylesProvider>
    </Provider>
  );
}

export default App;
