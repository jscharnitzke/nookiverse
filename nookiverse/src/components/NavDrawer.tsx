import React from 'react';
import { Link } from 'react-router-dom';
import { IfFirebaseAuthed } from '@react-firebase/auth';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';

import SvgHome from './SvgHome';
import SvgAcIconsFurnitureBlack from './SvgAcIconsFurnitureBlack';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      wdith: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  })
);

export default function NavDrawer() {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <nav className={classes.drawerContainer}>
        <List>
          <Link to="/">
            <ListItem button key="home">
              <ListItemIcon>
                <SvgIcon
                  component={SvgHome}
                  viewBox="0 10 40 40"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary="Home" color="secondary" />
            </ListItem>
          </Link>
          <Link to="/catalog">
            <ListItem button key="catalog">
              <ListItemIcon>
                <SvgIcon
                  component={SvgAcIconsFurnitureBlack}
                  viewBox="100 100 400 400"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary="Catalog" color="secondary" />
            </ListItem>
          </Link>
          <IfFirebaseAuthed>
            {() => (
              <Link to="/admin">
                <ListItem button key="admin">
                  <ListItemText primary="Admin" />
                </ListItem>
              </Link>
            )}
          </IfFirebaseAuthed>
        </List>
      </nav>
    </Drawer>
  );
}
