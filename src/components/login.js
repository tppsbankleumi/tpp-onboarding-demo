import React, { useEffect, useReducer, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createToken } from '../api/loginApi';
import { setToken } from '../redux/actions/loginAction';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Leumi CTO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: 'black',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [showProgress, setShowProgress] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mail, setMail] = useState('');
  const history = useHistory();

  if (props.token) {
    history.push('./');
    return <div></div>;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} className={classes.image} md={7}>
        <img
          style={{ width: '100%', height: '100%' }}
          src={window.location.origin + '/fintech.jpg'}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        className={classes.root}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ברוכים הבאים לאפליקציית Fin-Friendly אפליקציה שעוזרת לנהל את חשבונכם
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              value={mail}
              required
              onChange={setValue.bind(this, setMail)}
              fullWidth
              id="email"
              label="כתובת מייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={setValue.bind(this, setPassword)}
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              fullWidth
              disabled={!password && !mail}
              variant="contained"
              id="login"
              color="primary"
              onClick={loginAction.bind(
                this,
                mail,
                password,
                setShowProgress,
                setMessage,
                props.setToken
              )}
              className={classes.submit}
            >
              שלח בקשה
            </Button>
            <div
              style={{
                display: 'flex',
                widht: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {showProgress && <CircularProgress />}
              {message && (
                <Typography component="h1" variant="h5" color="error">
                  {message}
                </Typography>
              )}
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

function setValue(setAction, event) {
  setAction(event.target.value);
}
async function loginAction(email, password, setPrcosse, setMessage, setToken) {
  setMessage('');
  setPrcosse(true);
  setToken("2314123423423");
  // let response = await createToken(email, password);
  // let body = JSON.parse(response.body);
  // if (response.statusCode === 200 && body.token) {
  //   setToken(body.token);
  // } else {
  //   setMessage(body.message);
  // }
  // setPrcosse(false);
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
  };
};

const mapDispatchToProps = {
  setToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
