import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import ProfileControls from './ProfileControls';

type AppHeaderBarProps = {
    title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    profileControls: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
  }),
);

/**
 * The global header bar.
 * @param props 
 */
export default function AppHeaderBar(props: AppHeaderBarProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>{props.title}</Typography>
                    <ProfileControls className={classes.profileControls} isLoggedIn={true} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

AppHeaderBar.propTypes = {
    title: PropTypes.string.isRequired
}

AppHeaderBar.defaultProps = {
    title: 'Web App'
}