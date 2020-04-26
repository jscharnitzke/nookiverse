import React, { useState } from 'react';


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

import * as firebase from 'firebase';

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
        textAlign: 'center'
    }
  }),
);

const recaptchaRef = React.createRef<ReCAPTCHA>();

export default function GuestProfileControls() {
    const classes = useStyles();
    const [isMember, setIsMember] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailHelperText, setEmailHelperText] = useState();
    const [passwordHelperText, setPasswordHelperText] =  useState();
    const [emailError, setEmailError] = useState(false);
    const [passwordError,  setPasswordError] =  useState(false);
    const [actionText, setActionText] = useState();
    const [hasForgottenPassword, setHasForgottenPassword] = useState(false);

    const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
        setIsMember(newTabValue === 0);
        setActionText(!isMember ? 'log in' : 'sign up');
        setTabValue(newTabValue);
        setHasForgottenPassword(false);
    }

    const handleOpenDialog = () => setIsOpen(true);
    const handleCloseDialog = () => setIsOpen(false);
    
    const handleOpenDialogLogIn = () => {
        handleOpenDialog();
        setIsMember(true);
        setActionText('log in');
        setTabValue(0);
        setHasForgottenPassword(false);
    }
    const handleOpenDialogRegister = () => {
        handleOpenDialog();
        setIsMember(false);
        setActionText('sign up');
        setTabValue(1);
        setHasForgottenPassword(false);
    }

    const handleClickResetPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setActionText('reset password');
        setHasForgottenPassword(true);
    }
    
    const handleLoginClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            handleCloseDialog();
        } catch(error) {
            console.error(error);
        }
    }
    
    const handleRegisterClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(recaptchaRef.current) {
            recaptchaRef.current.execute();
        }
    }

    const registerNewUser = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            handleCloseDialog();
        } catch(error) {
            switch(error.code) {
                case 'auth/weak-password':
                    setPasswordHelperText(error.message);
                    setPasswordError(true);
                    break;
                default:
                    setEmailHelperText('Unknown error. Please try again later.');
                    setEmailError(true);
                    setPasswordError(true);
            }
        }

    }

    const handleLogInClickGoogle = async () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        const loginResponse = await firebase.auth().signInWithPopup(googleAuthProvider);
        
        if(loginResponse && loginResponse.credential) {
            handleCloseDialog();
        }
    }
    
    const handleLogInClickFacebook = async () => {
        const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
        const loginResponse = await firebase.auth().signInWithPopup(facebookAuthProvider);
        
        if(loginResponse && loginResponse.credential) {
            handleCloseDialog();
        }
    }
    
    const handleLogInClickTwitter = async () => {
        const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
    
        try {
            await firebase.auth().signInWithPopup(twitterAuthProvider);
            handleCloseDialog();
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Box display="flex" flexDirection="row">
                <Button variant="contained" color="secondary" onClick={handleOpenDialogLogIn}>
                    Log In
                </Button>
                <Button variant="contained" color="secondary" onClick={handleOpenDialogRegister}>
                    Register
                </Button>
            </Box>
            <Dialog open={isOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <AppBar position="static" color="default">
                    <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="login and register tabs">
                        <Tab label="I have an account" />
                        <Tab label="I'm a new user" />
                    </Tabs>
                </AppBar>
                <DialogContent>
                    <Box className={classes.ssoBox} my={4} px={4}>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained' 
                            onClick={handleLogInClickFacebook} 
                            startIcon={<FaFacebook color='#4267b2' />}
                        >                                    
                            {actionText + ' with Facebook'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained' 
                            onClick={handleLogInClickGoogle}
                            startIcon={<FcGoogle />}
                        >                                    
                            {actionText + ' with Google'}
                        </Button>
                        <Button 
                            className={classes.ssoButton}
                            variant='contained'
                            startIcon={<FaTwitter color='#38A1F3' />}
                            onClick={handleLogInClickTwitter}
                            disabled
                        >                                    
                            {actionText + ' with Twitter'}
                        </Button>
                    </Box>
                    <DialogContentText className={classes.dialogText}>
                        or {actionText} directly with Nookiverse
                    </DialogContentText>
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
                            }
                        }
                        helperText={emailHelperText}
                        error={emailError}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={
                            e => {
                                setPassword(e.target.value)
                            }
                        }
                        helperText={passwordHelperText}
                        error={passwordError}
                    />
                    <DialogContentText className={classes.dialogText} hidden={!isMember}>
                        <Link href='#' onClick={handleClickResetPassword}>I forgot my password</Link>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={isMember ? handleLoginClick : handleRegisterClick} color="secondary">
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
        </div>
    );
}