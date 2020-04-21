import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

type CallToActionButtonProps = {
  text: string;
  children: object;
  onClick: object;
}
/**
 * Button used for calling users to perform an action.
 */
export default function CallToActionButton(props: CallToActionButtonProps) {
  return (
      <Button variant="contained" color="secondary">
        {props.children} {props.text}
      </Button>
  );
}

CallToActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.object,
  onClick: PropTypes.object
}

CallToActionButton.defaultProps = {
  text: 'OK',
  onClick: (text: string) => console.log(text + ' clicked')
}
