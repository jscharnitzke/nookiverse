import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { Link } from  'react-router-dom';

import * as firebase from 'firebase';
import 'firebase/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyItems: 'flex-end'
    },
    materialIcon: {
        fontFamily: ['Roboto', 'Arial'].join(',')
    },
    avatar: {
      objectFit: 'cover',
      width: theme.spacing(6),
      height: theme.spacing(6),
      borderRadius: theme.spacing(3),
      margin: 0
    }
  }),
);

const handleClickLogout = () => {
  firebase.auth().signOut();
}

/**
 * Controls for existing members to customize their profiles or log out.
 */
export default function MemberProfileControls() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
          <Link to="/profile">
            <img alt="avatar" className={classes.avatar} src={firebase.auth().currentUser?.photoURL as string} />
          </Link>
          <IconButton onClick={handleClickLogout}>
            <ExitToApp />
          </IconButton>
        </Box>
    );
}