import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

type FlatButtonProps = {
  text: string;
  children: object;
}
/**
 * Button used for actions that are not intended to stand out.
 */
export default function FlatButton(props: FlatButtonProps) {
  return (
      <Button>
        {props.children} {props.text}
      </Button>
  );
}

FlatButton.propTypes = {
  text: PropTypes.string.isRequired
}

FlatButton.defaultProps = {
  text: 'OK'
}
