import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

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
import { firebaseConfig } from './firebase.config';
import ToolDrawer from './components/ToolDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: 0,
    },
  })
);

function App() {
  const classes = useStyles();
  const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
  const [toolDrawerIsOpen, setToolDrawerIsOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerIsOpen(!navDrawerIsOpen);
  };

  const toggleToolDrawer = () => {
    setToolDrawerIsOpen(!toolDrawerIsOpen);
  };

  return (
    <ThemeProvider theme={theme}>
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
            <ToolDrawer
              isOpen={toolDrawerIsOpen}
              handleCloseDrawer={() => {
                setToolDrawerIsOpen(false);
              }}
            />
            <main className={classes.content}>
              <Toolbar />
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/admin" component={Admin} />
              <PrivateRoute path="/profile" component={Profile} />
            </main>
          </Router>
        </FirebaseAuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
