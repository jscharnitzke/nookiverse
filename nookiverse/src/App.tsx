import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import { CookiesProvider, useCookies } from 'react-cookie';

import {
  ThemeProvider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { theme } from './themes/nookiverse.theme';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppHeaderBar from './components/AppHeaderBar';

import './App.css';
import NavDrawer from './components/NavDrawer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Admin from './pages/Admin';
import { Profile } from './pages/Profile';

import 'firebase/auth';
import * as firebase from 'firebase/app';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import { firebaseConfig } from './firebase.config';
import ToolDrawer from './components/ToolDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    content: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth
      },
      flexGrow: 1,
      padding: 0,
    },
  })
);

function App() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['toolDrawerIsOpen']);

  const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
  const [toolDrawerIsOpen, setToolDrawerIsOpen] = useState(cookies['toolDrawerIsOpen'] === 'true');

  const toggleNavDrawer = () => {
    setNavDrawerIsOpen(!navDrawerIsOpen);
  };

  const toggleToolDrawer = () => {
    setCookie('toolDrawerIsOpen', !toolDrawerIsOpen);
    setToolDrawerIsOpen(!toolDrawerIsOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <FirestoreProvider firebase={firebase} {...firebaseConfig}>
      <CookiesProvider>
        <div className={classes.root}>
          <CssBaseline />
          <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
            <Router>
              <AppHeaderBar
                handleClickMenuIcon={toggleNavDrawer}
                handleClickToolIcon={toggleToolDrawer}
                title="Nookiverse"
              />
              <NavDrawer
                isOpen={navDrawerIsOpen}
                handleCloseDrawer={() => {
                  setNavDrawerIsOpen(false);
                }}
              />
              <main className={classes.content}>
                <Toolbar />
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/profile" component={Profile} />
              </main>
              <ToolDrawer
                isOpen={toolDrawerIsOpen}
                handleCloseDrawer={() => {
                  setCookie('toolDrawerIsOpen', false);
                  setToolDrawerIsOpen(false);
                }}
              />
            </Router>
          </FirebaseAuthProvider>
        </div>
      </CookiesProvider>
      </FirestoreProvider>
    </ThemeProvider>
  );
}

export default App;
