import React from 'react';

import { makeStyles,  createStyles, Theme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import ChangePasswordCard from '../components/ChangePasswordCard';

const useStyles = makeStyles((theme: Theme) =>  
    createStyles({
        headerBox: {
            display: 'flex',
            flexDirection: 'column',
            margin: 0
        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        avatar: {
            display: 'flex',
            flexGrow: 0,
            width: 144,
            height: 'auto',
            margin: theme.spacing(2),
            borderRadius: 72,
            justifySelf: 'center'
        },
        toolGrid: {
            justify: 'space-evenly',
            alignItems: 'flex-start',
            spacing: theme.spacing(),
            padding: theme.spacing()
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

export const Profile = () => {
    const classes = useStyles();

    const currentUser = firebase.auth().currentUser;
    const displayName = currentUser ? currentUser.displayName : 'John Doe';
    const photoURL = currentUser ?  currentUser.photoURL : '';

    return (
        <Box>
            <Box className={classes.headerBox}>
                <Box className={classes.flexRow}>
                    <img className={classes.avatar} alt={displayName as string} src={photoURL as string} />
                </Box>
                <Box  className={classes.flexRow}>
                    <h1>Welcome, {displayName}!</h1>
                </Box>
            </Box>
            <Grid container direction="row" className={classes.toolGrid}>
                <Grid item xs={6}>
                    <ChangePasswordCard />
                </Grid>
            </Grid>
        </Box>
    )
}