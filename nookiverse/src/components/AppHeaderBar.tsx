import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ProfileControls from './ProfileControls';

type AppHeaderBarProps = {
    title: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
                    <ProfileControls isLoggedIn={true} />
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