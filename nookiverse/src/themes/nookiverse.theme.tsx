import { createMuiTheme } from '@material-ui/core/styles';
import Typography from 'typography';
import injectFonts from 'typography-inject-fonts';

const typography = new Typography({
  googleFonts: [
    {
      name: 'Baloo Bhaina 2',
      styles: [
        '400',
        '500',
        '700'
      ]
    },
    {
      name: 'Roboto',
      styles: [
        '400',
        '500',
        '700'
      ]
    }
  ]
});
typography.injectStyles();
injectFonts(typography);

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#19ad5e',
    },
    secondary: {
      main: '#7b6c53',
      contrastText: '#f8f8f0',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['Baloo Bhaina 2', 'Roboto', 'Arial'].join(','),
  },
  spacing: 8,
});

