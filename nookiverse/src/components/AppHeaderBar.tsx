import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

import ProfileControls from './ProfileControls';
import SvgAcIconsGyroidBlack from './SvgAcIconsGyroidBlack';

type AppHeaderBarProps = {
  title: string;
  className?: string;
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
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <IconButton aria-label="tool-counter">
          <SvgIcon
            component={SvgAcIconsGyroidBlack}
            viewBox="250 150 350 350"
            color="secondary"
          />
        </IconButton>
        <ProfileControls isLoggedIn={true} />
      </Toolbar>
    </AppBar>
  );
}

AppHeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AppHeaderBar.defaultProps = {
  title: 'Web App',
};
