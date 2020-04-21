import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

type GuestProfileControlsProps = {
    handleLoginClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleRegisterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function GuestProfileControls(props: GuestProfileControlsProps) {
    return (
        <Box display="flex" flexDirection="row">
            <Button variant="contained" color="secondary" onClick={props.handleLoginClick}>
                Log In
            </Button>
            <Button variant="contained" color="secondary" onClick={props.handleRegisterClick}>
                Register
            </Button>
        </Box>
    );
}

GuestProfileControls.propTypes = {
    handleLoginClick: PropTypes.func.isRequired,
    handleRegisterClick: PropTypes.func.isRequired
}