import React from 'react';
import PropTypes from 'prop-types';

import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';

import NavLinkList from './NavLinkList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  })
);

type HandleCloseDrawerFunction = (event: React.MouseEvent) => void;

type NavDrawerProps = {
  isOpen: boolean;
  handleCloseDrawer: HandleCloseDrawerFunction;
};

export default function NavDrawer(props: NavDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawerContainer}>
      <Hidden smUp implementation="css">
        <Drawer
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{
            keepMounted: true,
          }}
          onClose={props.handleCloseDrawer}
          open={props.isOpen}
          variant="temporary"
        >
          <NavLinkList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          open
          variant="permanent"
        >
          <Toolbar />
          <NavLinkList />
        </Drawer>
      </Hidden>
    </nav>
  );
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseDrawer: PropTypes.func.isRequired,
};

NavDrawer.defaultProps = {
  isOpen: false,
  handleCloseDrawer: () => {
    throw new Error('setIsOpen must be overridden');
  },
};
