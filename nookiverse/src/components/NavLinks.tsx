import React from 'react';
import { Link } from 'react-router-dom';
import { IfFirebaseAuthed } from '@react-firebase/auth';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';

import SvgHome from './SvgHome';
import SvgAcIconsFurnitureBlack from './SvgAcIconsFurnitureBlack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

export default function NavLinks() {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
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
    </div>
  );
}
