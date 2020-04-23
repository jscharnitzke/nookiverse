import React, { useState } from 'react';

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

import { AuthContext } from './context/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
      padding: theme.spacing(3),
      marginLeft: drawerWidth
    },
    list: {
      width: 250
    },
    fullList: {
      width: 'auto'
    },
}));

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token") as string);
  const [authToken, setAuthToken] = useState(existingTokens);
  const classes = useStyles();

  const logUserIn = (data: string) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  }

  const logUserOut = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AuthContext.Provider value={{ authToken, setAuthToken: logUserIn, expireAuthToken: logUserOut }}>
          <AppHeaderBar title='Nookiverse' />
          <Router>
            <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
              <Toolbar/>
              <div className={classes.drawerContainer}>
                <List>
                  <Link to="/">
                    <ListItem button key="home">
                      <ListItemText primary="Home" />
                    </ListItem>
                  </Link>
                  <Link to="/admin">
                    <ListItem button key="admin">
                      <ListItemText primary="Admin" />
                    </ListItem>
                  </Link>
                </List>
              </div>
            </Drawer>
            <main className={classes.content}>
              <Toolbar />
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/admin" component={Admin} />
            </main>
          </Router>
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
