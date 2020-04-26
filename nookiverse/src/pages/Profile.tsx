import React from 'react';

import { makeStyles,  createStyles, Theme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import * as firebase from 'firebase';

const useStyles = makeStyles((theme: Theme) =>  
    createStyles({
        avatarBox: {
            display: 'flex',
            flex: '1 1 240',
            justifyContent: 'left',
            margin: 0
        },
        avatar: {
            width: 144,
            height: 'auto',
            margin: theme.spacing(2)
        },
        profileDetails: {
            margin: theme.spacing(2)
        }
    })
)

export const Profile = () => {
    const classes = useStyles();
    const currentUser = firebase.auth().currentUser;
    const displayName = currentUser ? currentUser.displayName : 'John Doe';
    const photoURL = currentUser ?  currentUser.photoURL : '';
    const email = currentUser ? currentUser.email : 'you@example.com';

    return (
        <Box className={classes.avatarBox}>
            <img className={classes.avatar} alt={displayName as string} src={photoURL as string} />
            <Box className={classes.profileDetails}>
                <h3>{displayName}</h3>
                <h4>{email}</h4>
            </Box>
        </Box>
    )
}