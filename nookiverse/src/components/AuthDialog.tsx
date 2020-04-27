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
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import ReCAPTCHA from 'react-google-recaptcha';

import * as firebase from 'firebase/app';
import 'firebase/auth';

type AuthDialogProps = {
    isOpen: boolean,
    defaultTab: number,
    handleClickDialogClosed: Function
}

const actionTextStrings = [
    'log in',
    'sign up',
    'reset password'
]

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
    const [actionText, setActionText] = useState(actionTextStrings[tabValue]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordHelperText, setPasswordHelperText] =  useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError,  setPasswordError] =  useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // re-render if the parent has changed which tab should be opened on init
    useEffect(() => {
        setTabValue(props.defaultTab);
        setActionText(actionTextStrings[props.defaultTab]);
    }, [props.defaultTab]);

    const closeDialog = () => {
        props.handleClickDialogClosed();
        setTabValue(props.defaultTab);
        setActionText(actionTextStrings[props.defaultTab]);
    }

    const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
        setActionText(actionTextStrings[newTabValue]);
        setTabValue(newTabValue);
        setEmailError(false);
        setEmailHelperText('');
        setPasswordError(false);
        setPasswordHelperText('');
    }
    
    const handleClickLogInGoogle = async () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(googleAuthProvider);
    }
    
    const handleClickLogInFacebook = async () => {
        const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        await firebase.auth().signInWithPopup(facebookAuthProvider);
    }
    
    const handleClickLogInTwitter = async () => {
        const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
    
        try {
            await firebase.auth().signInWithPopup(twitterAuthProvider);
            closeDialog();
        } catch(error) {
            console.error(error);
        }
    }

    const handleClickResetPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setTabValue(2);
        setActionText('reset password');
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleClickActionButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch(tabValue) {
            case 0:
                logInLocal();
                break;
            case 1:
                registerLocal();
                break;
            case 2:
                resetPassword();
                break;
            default:
                console.error('Invalid tab selected');
        }
    }
    
    const logInLocal = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            closeDialog();
        } catch(error) {
            console.error(error);
        }
    }
    
    const registerLocal = () => {
        if(recaptchaRef.current) {
            recaptchaRef.current.execute();
        }
    }

    const resetPassword = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            closeDialog();
        } catch(error) {
            console.error(error);
        }
    }

    const validateEmail = () => {

    }

    const validatePassword = () => {
        if(password.length < 12) {
            setPasswordHelperText('Password must be at least 12 characters');
            setPasswordError(true);
        } else {
            setPasswordHelperText('');
            setPasswordError(false);
        }
    }

    const handleErrors = (error: firebase.auth.Error) => {
        switch(error.code) {
            case 'auth/weak-password':
                setPasswordHelperText(error.message);
                setPasswordError(true);
                break;
            default:
                setEmailHelperText('Unknown error. Please try again later.');
                setPasswordHelperText('Unknown error. Please try again later.');
                setEmailError(true);
                setPasswordError(true);

        }
    }

    const registerNewUser = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.auth().currentUser?.sendEmailVerification();
            closeDialog();
        } catch(error) {
            handleErrors(error);
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
            <DialogContent>
                {tabValue !== 2 && 
                    <Box className={classes.ssoBox} my={4} px={4}>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained' 
                            onClick={handleClickLogInFacebook} 
                            startIcon={<FaFacebook color='#4267b2' />}
                        >                                    
                            {actionText + ' with Facebook'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained' 
                            onClick={handleClickLogInGoogle}
                            startIcon={<FcGoogle />}
                        >                                    
                            {actionText + ' with Google'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained'
                            startIcon={<FaTwitter color='#38A1F3' />}
                            onClick={handleClickLogInTwitter}
                            disabled
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
                    fullWidth
                    onChange={
                        e => {
                            setEmail(e.target.value);
                            validateEmail();
                        }
                    }
                    helperText={emailHelperText}
                    error={emailError}
                    required
                />
                {tabValue !== 2 &&
                    <FormControl fullWidth>
                        <InputLabel htmlFor="password" required>Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            required
                            onChange={e => {
                                setPassword(e.target.value);
                                validatePassword();
                            }}
                            error={passwordError}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visilibity"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={passwordError}>{passwordHelperText}</FormHelperText>
                    </FormControl>
                }
                <DialogContentText className={classes.dialogText} hidden={tabValue !== 0}>
                    <Link href='#' onClick={handleClickResetPassword}>I forgot my password</Link>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button id="action-button" variant="outlined" onClick={handleClickActionButton} color="secondary">
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