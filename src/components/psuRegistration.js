import React, { useEffect, useReducer, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createConsent } from '../api/consentApi';
import {
  setConsent,
  setConsentParameters,
  setToken,
} from '../redux/actions/loginAction';
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
    flexDirection: 'column',
    alignItems: 'center',
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

function PsuRegistration(props) {
  const classes = useStyles();
  const [showProgress, setShowProgress] = useState(false);
  const [showApprove, setShowApprove] = useState(true);
  const [checked, setChecked] = useState(false);
  const [consentId, setConsentId] = useState('');

  const [message, setMessage] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [creatDoneeMessage, setCreateDoneMessage] = useState('');
  const [approveMessage, setApproveMessage] = useState('');
  const [approveDoneMessage, setApproveDoneMessage] = useState('');
  const [id, setId] = useState('');
  const history = useHistory();
  const handleChange = event => {
    setChecked(true);
  };
  if (showApprove) {
    return showApproveRegistration(
      checked,
      handleChange,
      showApprove,
      setShowApprove,
      classes
    );
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} className={classes.image} md={7}>
        <img
          style={{ width: '100%', height: '100%' }}
          src={window.location.origin + '/leumi.jpg'}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            ברוכים הבאים לדף הפינטק של לאומי
          </Typography>
          <div style={{ height: 10 }}></div>
          <Typography component="h4" variant="h5">
            יש צורך להזין את תעודת הזהות של בעלי החשבון
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              disabled={showProgress}
              value={id}
              required
              onChange={setValue.bind(this, setId)}
              fullWidth
              id="id"
              label="תעודת זהות"
              name="id"
              autoComplete="id"
              autoFocus
            />

            <Button
              fullWidth
              disabled={!id || showProgress}
              variant="contained"
              id="login"
              color="primary"
              onClick={sendConsent.bind(
                this,
                props,
                id,
                setShowProgress,
                setMessage,
                consentId,
                setConsentId,
                history,
                setCreateMessage,
                setCreateDoneMessage,
                setApproveMessage,
                setApproveDoneMessage
              )}
              className={classes.submit}
            >
              תן הרשאה
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
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
              {createMessage && (
                <Typography component="h1" variant="h5">
                  {createMessage}
                </Typography>
              )}
              {creatDoneeMessage && (
                <Typography component="h1" variant="h5">
                  {creatDoneeMessage}
                </Typography>
              )}
              {approveMessage && (
                <Typography component="h1" variant="h5">
                  {approveMessage}
                </Typography>
              )}
              {approveDoneMessage && (
                <Typography component="h1" variant="h5">
                  {approveDoneMessage}
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
async function sendConsent(
  props,
  id,
  setShowProgress,
  setProgressMessage,
  consentId,
  setConsentId,
  history,
  setCreateMessage,
  setCreateDoneMessage,
  setApproveMessage,
  setApproveDoneMessage
) {
  setShowProgress(true);
  setProgressMessage('');
  setCreateMessage('מייצר הסכמה');
  let response = await createConsent(id);
  console.log(`CONSENT CREATED`);
  if (response.consentId) {
    setConsentId(response.consentId);
    setCreateDoneMessage('הסכמה נוצרה');
    await sleep(1000);
    setApproveMessage('מאשר הסכמה');
    await sleep(1000);
    // let approveResponse = await approveConsnet(response.consentId, id);
    setApproveDoneMessage('הסכמה אושרה');
    await sleep(1000);
    // if (response.consentId && approveResponse.code) {
    //   props.setConsent(
    //     response.consentId,
    //     approveResponse.code,
    //     approveResponse.verifier
    //   );
    //   history.push('./');
    // }
  } else {
    if (response.message === 'Request failed with status code 400') {
      setProgressMessage('ת.ז. לא קיימת במערכת');
    }
  }
  // let response = await createToken(email, password);
  // let body = JSON.parse(response.body);
  // if (response.statusCode === 200 && body.token) {
  //   setToken(body.token);
  // } else {
  //   setMessage(body.message);
  // }
  setShowProgress(false);
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
}

function showApproveRegistration(
  checked,
  handleChange,
  approved,
  setShowApproved,
  classes
) {
  return (
    <div dir="rtl">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} className={classes.image} md={7}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={window.location.origin + '/leumi.jpg'}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div dir="rtl" className={classes.paper}>
            <Typography component="h1" variant="h5">
              ברוכים הבאים לדף הפינטק של לאומי
            </Typography>
            <div style={{ height: 10 }}></div>
            <Typography component="h4" variant="h5">
              יש צורך לאשר את תנאי השימוש על מנת לאפשר ל Fin-Friendly לקבל את
              נתוני החשבון
            </Typography>

            <form className={classes.form} noValidate>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      id={1}
                      onChange={handleChange}
                      name={1}
                    />
                  }
                  label={'מאשר תנאים '}
                />
                <div style={{ width: 20 }}></div>
                <Link
                  color="primary"
                  id="signUp"
                  href="https://developers.facebook.com/terms/"
                >
                  תנאי אישור למתן הרשאות
                </Link>
              </div>
              <Button
                fullWidth
                disabled={!checked}
                variant="contained"
                id="approveAccount"
                color="primary"
                onClick={setShowApproved.bind(this, false)}
              >
                המשך לתהליך מתן הרשאות
              </Button>

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.loginReducer.token,
    consentId: state.loginReducer.consentId,
    accsessCode: state.loginReducer.accsessCode,
  };
};

const mapDispatchToProps = {
  setConsent,
  setConsentParameters,
  setToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(PsuRegistration);
