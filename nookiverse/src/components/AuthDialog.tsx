import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import ReCAPTCHA from 'react-google-recaptcha';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import PasswordField from './PasswordField';

type AuthDialogProps = {
    isOpen: boolean,
    defaultTab: number,
    handleClickDialogClosed: Function
}

const ProviderObject:{[key:string]: any} = {
    'google': firebase.auth.GoogleAuthProvider,
    'facebook': firebase.auth.FacebookAuthProvider,
    'twitter': firebase.auth.TwitterAuthProvider
}

const ActionTextStrings = [
    'log in',
    'sign up',
    'reset password'
];

const EmailErrorStrings: {[key: string]: string} = {
    'auth/user-not-found': 'Your email or password is incorrect',
    'auth/invalid-email': 'Something doesn\'t look right!',
    'auth/wrong-password': 'Your email or password is incorrect',
}

const PasswordErrorStrings: {[key:string]: string} = {
    'auth/user-not-found': 'Your email or password is incorrect',
    'auth/wrong-password': 'Your email or password is incorrect',
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  ssoBox: {
      display: 'flex',
      flexDirection: 'column',
  },
  ssoButton: {
      margin: 4,
      width: '100%',
      textAlign: 'left'
  },
  dialogText: {
      marginTop:  theme.spacing(2),
      textAlign: 'center',
      width: '100%'
  },
  invisibleTab: {
    display: 'none'
  }
}),
);

const recaptchaRef = React.createRef<ReCAPTCHA>();

export default function AuthDialog(props: AuthDialogProps) {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(props.defaultTab);
    const [actionText, setActionText] = useState(ActionTextStrings[tabValue]);

    const [isProcessing, setIsProcessing] = useState(false);

    const [email, setEmail] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(false);

    // re-render if the parent has changed which tab should be opened on init
    useEffect(() => {
        setTabValue(props.defaultTab);
        setActionText(ActionTextStrings[props.defaultTab]);
    }, [props.defaultTab]);

    const closeDialog = () => {
        props.handleClickDialogClosed();
        // reset selected tab and associated action text if the users cancels so that
        // current settings aren't retained if they bring the dialog back up again
        setTabValue(props.defaultTab);
        setActionText(ActionTextStrings[props.defaultTab]);
    }

    const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
        setActionText(ActionTextStrings[newTabValue]);
        setEmail('');
        setEmailHelperText('');
        setEmailIsValid(true);
        setPassword('');
        setPasswordIsValid(true);
        setTabValue(newTabValue);
    }

    const handleClickSsoLogin = async (provider: string) => {
        setIsProcessing(true);
        setEmailHelperText('');
        setPasswordHelperText('');

        try {
            const authProvider = new ProviderObject[provider]();
            await firebase.auth().signInWithPopup(authProvider);
            closeDialog();
        } catch(error) {
            handleErrors(error);
        } finally {
            setIsProcessing(false);
        }
    }
    
    const handleClickResetPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setTabValue(2);
        setActionText('reset password');
    }

    const ActionButtonFunction = [
        () => logInLocal(),
        () => registerLocal(),
        () => resetPassword()
    ];
    
    const logInLocal = async () => {
        setIsProcessing(true);
        setEmailHelperText('');
        setPasswordHelperText('');

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            closeDialog();
        } catch(error) {
            handleErrors(error);
        } finally {
            setIsProcessing(false);
        }
    }
    
    const registerLocal = () => {
        if(recaptchaRef.current) {
            recaptchaRef.current.execute();
        }
    }

    const resetPassword = async () => {
        setIsProcessing(true);
        setEmailHelperText('');
        setPasswordHelperText('');

        try {
            await firebase.auth().sendPasswordResetEmail(email);
            closeDialog();
        } catch(error) {
            handleErrors(error);
        } finally {
            setIsProcessing(false);
        }
    }

    const validateEmail = () => {
        const regexTestResult = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email);
        setEmailIsValid(regexTestResult);
        setEmailHelperText(regexTestResult ? '' : EmailErrorStrings['auth/invalid-email']);
    }

    const handleErrors = (error: firebase.auth.Error) => {
        console.error(error);

        if(error.code in EmailErrorStrings) {
            setEmailHelperText(EmailErrorStrings[error.code]);
        }

        if(error.code in PasswordErrorStrings) {
            setPasswordHelperText(PasswordErrorStrings[error.code]);
        }
    }

    const registerNewUser = async () => {
        setIsProcessing(true);
        setEmailHelperText('');
        setPasswordHelperText('');

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.auth().currentUser?.sendEmailVerification();
            closeDialog();
        } catch(error) {
            handleErrors(error);
        } finally {
            setIsProcessing(false);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if(
            event.key === 'Enter'
            && emailIsValid
            && passwordIsValid
        ) { 
            ActionButtonFunction[tabValue]();
        }
    }

    return (
        <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
            <AppBar position="static" color="default">
                <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="login and register tabs">
                    <Tab label="I have an account" />
                    <Tab label="I'm a new user" />
                    <Tab label="I forgot my password" className={classes.invisibleTab} />
                </Tabs>
            </AppBar>
            <DialogContent onKeyPress={handleKeyPress}>
                {tabValue !== 2 && 
                    <Box className={classes.ssoBox} my={4} px={4}>
                        <Button 
                            className={classes.ssoButton}
                            disabled={isProcessing}
                            onClick={() => handleClickSsoLogin('facebook')} 
                            startIcon={<FaFacebook color='#4267b2' />}
                            variant='contained' 
                        >                                    
                            {actionText + ' with Facebook'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            disabled={isProcessing}
                            onClick={() => handleClickSsoLogin('google')}
                            startIcon={<FcGoogle />}
                            variant='contained' 
                        >                                    
                            {actionText + ' with Google'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            disabled={isProcessing}
                            startIcon={<FaTwitter color='#38A1F3' />}
                            onClick={() => handleClickSsoLogin('twitter')}
                            variant='contained'
                        >                                    
                            {actionText + ' with Twitter'}
                        </Button>
                    </Box>
                }
                {tabValue !== 2 && 
                    <Box>
                        <DialogContentText className={classes.dialogText}>
                            or {actionText} directly with Nookiverse
                        </DialogContentText>
                    </Box>
                }
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    fullWidth
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    onBlur={(e) => {
                        setEmail(e.target.value);
                        validateEmail();
                    }}
                    helperText={emailHelperText}
                    error={emailHelperText !== ''}
                    required
                    disabled={isProcessing}
                />
                {tabValue !== 2 &&
                    <PasswordField
                        disabled={isProcessing}
                        handleErrors={(errorText) => setPasswordHelperText(errorText)}
                        helperText={passwordHelperText}
                        label='Current Password'
                        password={password}
                        setPassword={setPassword}
                        setPasswordIsValid={setPasswordIsValid}
                        shouldValidate={tabValue === 1}
                    />
                }
                <DialogContentText className={classes.dialogText} hidden={tabValue !== 0}>
                    <Link href='#' onClick={handleClickResetPassword}>I forgot my password</Link>
                </DialogContentText>
                <DialogActions>
                    <Button 
                        disabled={isProcessing}
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button 
                        disabled={!passwordIsValid || !emailIsValid || isProcessing}
                        id="action-button" 
                        onClick={() => ActionButtonFunction[tabValue]()} 
                        color="secondary"
                        variant="outlined" 
                    >
                        { actionText }
                    </Button>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        onChange={registerNewUser}
                        sitekey="6Lf5Uu4UAAAAAAFzWvupEXSHkU7-A-f0wRXgj_Ae"
                    />
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

AuthDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    defaultTab: PropTypes.number.isRequired,
    handleClickDialogClosed: PropTypes.func.isRequired
}

AuthDialog.defaultProps = {
    isOpen: false,
    defaultTab: 0,
    handleClickDialogClosed: () => {
        throw new Error('handleClickDialogClosed must be overridden');
    }
}