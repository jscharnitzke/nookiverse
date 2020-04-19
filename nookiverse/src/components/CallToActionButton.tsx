import React from 'react';
import { Button } from '@material-ui/core';
import { ThemeProvider, withStyles } from '@material-ui/styles';

import { theme } from '../themes/nookiverse.theme';

/**
 * Button used for calling users to perform an action.
 */
export default class CallToActionButton extends React.Component {
  text: string;

  callToActionButton = withStyles({
    root: {
      fontWeight: 400
    }
  })(Button);

  constructor(props: any) {
    super(props);
    this.text = props.text ? props.text : 'OK';
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <this.callToActionButton variant="contained" color="secondary">
          {this.text}
        </this.callToActionButton>
      </ThemeProvider>
    );
  }
}
