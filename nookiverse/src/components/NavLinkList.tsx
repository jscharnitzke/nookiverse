import React from 'react';
import { IfFirebaseAuthed } from '@react-firebase/auth';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import { AppLink } from './NavLink';
import NavLink from './NavLink';
import SvgHome from './icons/SvgHome';
import SvgAcIconsFurnitureBlack from './icons/SvgAcIconsFurnitureBlack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    linkText: {
      textTransform: 'capitalize',
    },
  })
);

const publicLinks: AppLink[] = [
  {
    target: '',
    text: 'home',
    svg: {
      component: SvgHome,
      viewBox: '0 10 40 40',
      color: 'primary',
    },
  },
  {
    target: 'catalog',
    text: 'catalog',
    svg: {
      component: SvgAcIconsFurnitureBlack,
      viewBox: '100 100 400 400',
      color: 'primary',
    },
  },
];

const privateLinks: AppLink[] = [
  {
    target: 'admin',
    text: 'admin',
  },
];

export default function NavLinkList() {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <List className={classes.linkText}>
        {publicLinks.map((link) => (
          <NavLink link={link} key={link.text} />
        ))}
      </List>
      <Divider />
      <IfFirebaseAuthed>
        {() => (
          <List className={classes.linkText}>
            {privateLinks.map((link) => (
              <NavLink link={link} key={link.text} />
            ))}
          </List>
        )}
      </IfFirebaseAuthed>
    </div>
  );
}
