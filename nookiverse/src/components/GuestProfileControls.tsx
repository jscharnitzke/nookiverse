import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

type GuestProfileControlsProps = {
    handleLoginClick: (email: string, password: string) => void;
    handleRegisterClick: (email: string, password: string) => void;
}

export default function GuestProfileControls(props: GuestProfileControlsProps) {
    const [isMember, setIsMember] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleTabChange = (event: React.ChangeEvent<{}>, newTabValue: number) => {
        setIsMember(newTabValue === 0);
        setTabValue(newTabValue);
    }

    const logInOrRegisterText = isMember ? 'Log In' : 'Register';

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
                <DialogTitle id="form-dialog-title">{logInOrRegisterText}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            isMember ?
                            "Welcome back! Please log in below." :
                            "To start tracking your data, please register a new account."
                        }
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
    handleRegisterClick: PropTypes.func.isRequired
}