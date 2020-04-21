import React from 'react';
import './App.css';

import { ThemeProvider } from '@material-ui/styles';

import AppHeaderBar from './components/AppHeaderBar';

import { theme } from './themes/nookiverse.theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppHeaderBar title='Nookiverse' />
      </div>
    </ThemeProvider>
  );
}

export default App;
