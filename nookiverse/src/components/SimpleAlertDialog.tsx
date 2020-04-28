import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type SimpleAlertDialogProps = {
    close: Function,
    isOpen: boolean,
    title: string,
    text: string
}

export default function SimpleAlertDialog(props: SimpleAlertDialogProps) {
    return(
        <Dialog open={props.isOpen} onClose={() => props.close()} aria-labelledby="alert-dialog-title">
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.close()} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

SimpleAlertDialog.propTypes = {
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

SimpleAlertDialog.defaultProps = {
    close: () => {throw new Error('close must be overridden')}
}