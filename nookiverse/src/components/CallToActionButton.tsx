import React from 'react';
import { Button } from '@material-ui/core';

/**
 * Button used for calling users to action.
 */
export default class CallToActionButton extends React.Component {
  buttonText: string;

  constructor(props: any) {
    super(props);
    this.buttonText = props.text ? props.text : 'OK';
  }

  render() {
    return (
      <Button variant="contained" color="primary">
        {this.buttonText}
      </Button>
    );
  }
}
