import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

type CallToActionButtonProps = {
  text: string;
}

/**
 * Button used for calling users to perform an action.
 */
export default function CallToActionButton(props: CallToActionButtonProps) {
  return (
      <Button variant="contained" color="secondary">
        {props.text}
      </Button>
  );
}

CallToActionButton.propTypes = {
  text: PropTypes.string.isRequired
}

CallToActionButton.defaultProps = {
  text: 'OK'
}
