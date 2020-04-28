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

export default function ChangePasswordCard() {
    const classes = useStyles();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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
            await user.reauthenticateWithCredential(credential);
            user.updatePassword(newPassword);
            // TODO: add feedback mechanism so the user knows that their password has changed
        } catch(error) {
            console.error(error);
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
                        password={currentPassword}
                        passwordLabel='Current Password'
                        setPassword={setCurrentPassword}
                        shouldValidate={false}
                    />
                    <PasswordField
                        password={newPassword}
                        passwordLabel='New Password'
                        setPassword={setNewPassword}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button 
                    variant='contained'
                    color='secondary'
                    className={classes.actionButton} 
                    onClick={handleClickChangePassword}
                >
                    Change Password
                </Button>
            </CardActions>
        </Card>
    );
}