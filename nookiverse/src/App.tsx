import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

import { ThemeProvider, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { theme } from './themes/nookiverse.theme';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import AppHeaderBar from './components/AppHeaderBar';

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { Profile } from './pages/Profile';

import 'firebase/auth';
import * as firebase from 'firebase/app';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth';
import { firebaseConfig } from './firebase.config';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1
    },
    drawer: {
      wdith: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: 'auto'
    },
    content: {
      flexGrow: 1,
      padding: 0,
      marginLeft: drawerWidth,
    }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
          <Router>
            <AppHeaderBar title='Nookiverse' />
            <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
              <Toolbar/>
              <div className={classes.drawerContainer}>
                <List>
                  <Link to="/">
                    <ListItem button key="home">
                      <ListItemText primary="Home" />
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
            </Drawer>
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
