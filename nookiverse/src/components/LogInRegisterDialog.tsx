import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type LogInRegisterDialogProps = {
    isMember: boolean,
    isOpen: boolean,
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

/**
 * A dialog box for logging in or registering.
 * @param props 
 */
export default function LogInRegisterDialog(props: LogInRegisterDialogProps) {
    const classes = useStyles();
    const [isMember, setIsMember] = useState(false);

    if(props.isMember) {
      setIsMember(props.isMember);
    }

    return (
        <div className={classes.root}>
            <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
              Test
            </Dialog>
        </div>
    );
}

LogInRegisterDialog.propTypes = {
    isMember: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

LogInRegisterDialog.defaultProps = {
    isMember: false,
    isOpen: false
}