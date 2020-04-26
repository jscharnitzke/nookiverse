import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { Link } from  'react-router-dom';

import * as firebase from 'firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    materialIcon: {
        fontFamily: ['Roboto', 'Arial'].join(',')
    },
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
        <Box display="flex" className={classes.root} alignItems="center" justifyItems="flex-end">
          <Link to="/profile"><Avatar></Avatar></Link>
          <IconButton onClick={handleClickLogout}>
            <ExitToApp />
          </IconButton>
        </Box>
    );
}