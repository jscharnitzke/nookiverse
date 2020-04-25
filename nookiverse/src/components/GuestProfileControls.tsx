import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

type GuestProfileControlsProps = {
    handleLoginClick: (email: string, password: string) => void;
    handleRegisterClick: (email: string, password: string) => void;
    handleSSOLogin: (accessToken: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginDialog: {
        textAlign: 'center'
    }
  }),
);

export default function GuestProfileControls(props: GuestProfileControlsProps) {
    const [isMember, setIsMember] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleOpenDialog = () => setIsOpen(true);
    const handleOpenDialogLogIn = () => {
        handleOpenDialog();
        setIsMember(true);
        setTabValue(0);
    }
    const handleOpenDialogRegister = () => {
        handleOpenDialog();
        setIsMember(false);
        setTabValue(1);
    }

    const handleClose = () => setIsOpen(false);

    const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.handleLoginClick(email, password);
        handleClose();
    }

    const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.handleRegisterClick(email, password);
        handleClose();
    }

    const handleResponseFacebook = (response: any) => {
        console.log(response);
        handleClose();
    }

    const handleResponseGoogle = (response: any) => {
        props.handleSSOLogin(response.accessToken);
        handleClose();
    }

    const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
        setIsMember(newTabValue === 0);
        setTabValue(newTabValue);
    }

    const logInOrRegisterText = isMember ? 'Log in' : 'Sign up';

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
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <AppBar position="static" color="default">
                    <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="login and register tabs">
                        <Tab label="I have an account" />
                        <Tab label="I'm a new user" />
                    </Tabs>
                </AppBar>
                <DialogContent className={classes.loginDialog}>
                    <Box display="flex" flexDirection="column">
                        <FacebookLogin
                            appId=""
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={handleResponseFacebook}
                            textButton={logInOrRegisterText + ' with Facebook'}
                        />
                        <GoogleLogin
                            clientId='1008722468596-qcs7aiuce1knceq0tm8dn9454673f0ho.apps.googleusercontent.com'
                            buttonText={logInOrRegisterText + ' with Google'}
                            onSuccess={handleResponseGoogle}
                            onFailure={handleResponseGoogle}
                            cookiePolicy={'single_host_origin'}
                            tag='Button'
                            disabled={false}
                        />
                    </Box>
                    <Divider />
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
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={isMember ? handleLoginClick : handleRegisterClick} color="secondary">
                            { logInOrRegisterText }
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

GuestProfileControls.propTypes = {
    handleLoginClick: PropTypes.func.isRequired,
    handleRegisterClick: PropTypes.func.isRequired,
    handleSSOLogin: PropTypes.func.isRequired
}