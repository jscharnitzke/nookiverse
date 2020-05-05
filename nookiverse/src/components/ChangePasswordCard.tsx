import React, { useState } from 'react';

import { makeStyles,  createStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import VpnKey from '@material-ui/icons/VpnKey';

import PasswordField from '../components/PasswordField';
import SimpleAlertDialog from '../components/SimpleAlertDialog';

import * as firebase from 'firebase';
import 'firebase/auth';

const useStyles = makeStyles((theme: Theme) =>  
    createStyles({
        actionButton: {
            marginLeft: 'auto',
        },
        toolCard: {
            padding: theme.spacing()
        },
        toolBox: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
)

const ReauthErrorStrings:{[key: string]: string} = {
    'auth/wrong-password': 'This password is incorrect'
}

export default function ChangePasswordCard() {
    const classes = useStyles();
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordHelperText, setCurrentPasswordHelperText] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordHelperText, setNewPasswordHelperText] = useState('');
    const [newPasswordIsValid, setNewPasswordIsValid] = useState(false);

    const handleClickChangePassword = async () => {
        const user = firebase.auth().currentUser;

        if(!user || !user.email) {
            return;
        }

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        try {
            setIsProcessing(true);
            await user.reauthenticateWithCredential(credential);
            await user.updatePassword(newPassword);
            setIsDialogOpen(true);
        } catch(error) {
            setCurrentPasswordHelperText(ReauthErrorStrings[error.code]);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Card className={classes.toolCard}>
            <CardHeader 
                title='Change Password'
                action={<VpnKey color='primary' />}
            />
            <CardContent>
                <Box className={classes.toolBox}>
                    <PasswordField
                        disabled={isProcessing}
                        label='Current Password'
                        handleErrors={(errorText: string) => setCurrentPasswordHelperText(errorText)}
                        helperText={currentPasswordHelperText}
                        password={currentPassword}
                        setPassword={setCurrentPassword}
                        shouldValidate={false}
                    />
                    <PasswordField
                        disabled={isProcessing}
                        label='New Password'
                        handleErrors={(errorText: string) => setNewPasswordHelperText(errorText)}
                        helperText={newPasswordHelperText}
                        password={newPassword}
                        setPassword={setNewPassword}
                        setPasswordIsValid={setNewPasswordIsValid}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button 
                    variant='contained'
                    color='secondary'
                    className={classes.actionButton} 
                    onClick={handleClickChangePassword}
                    disabled={!newPasswordIsValid || isProcessing}
                >
                    Change Password
                </Button>
            </CardActions>
            // TODO: Change this to a SnackBar
            <SimpleAlertDialog
                close={() => setIsDialogOpen(false)}
                isOpen={isDialogOpen}
                title="Password Changed Successfully"
                text="Your password has been changed. Don't forget to use the new one to log in!"
            />
        </Card>
    );
}