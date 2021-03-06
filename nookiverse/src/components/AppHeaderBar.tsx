import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

import MenuIcon from '@material-ui/icons/Menu';

import ProfileControls from './ProfileControls';

import Tool from './icons/Tool';

type HandleClickIconFunction = (
  event: React.MouseEvent<HTMLButtonElement>
) => void;

type AppHeaderBarProps = {
  title: string,
  handleClickMenuIcon: HandleClickIconFunction,
  handleClickToolIcon: HandleClickIconFunction
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

/**
 * The global header bar.
 * @param props
 */
export default function AppHeaderBar(props: AppHeaderBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.root}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          className={classes.menuButton}
          color="inherit"
          edge="start"
          onClick={props.handleClickMenuIcon}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <IconButton aria-label="tool-counter"
          onClick={props.handleClickToolIcon}
        >
          <SvgIcon
            color="secondary"
            viewBox="20 20 80 100"
            component={Tool}
          />
        </IconButton>
        <ProfileControls isLoggedIn={true} />
      </Toolbar>
    </AppBar>
  );
}

AppHeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  handleClickMenuIcon: PropTypes.func.isRequired,
  handleClickToolIcon: PropTypes.func.isRequired
};

AppHeaderBar.defaultProps = {
  title: 'Web App',
  handleClickMenuIcon: () => {
    throw new Error('handleClickMenuIcon must be overridden');
  },
  handleClickToolIcon: () => {
    throw new Error('handleClickMenuIcon must be overridden');
  },
};
