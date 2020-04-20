import React from 'react';
import './App.css';

import { ThemeProvider } from '@material-ui/styles';

import AppHeaderBar from './components/AppHeaderBar';
import CallToActionButton from './components/CallToActionButton';

import { theme } from './themes/nookiverse.theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppHeaderBar title='Nookiverse' />
        <CallToActionButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
