import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AuthDialog from './AuthDialog';

export default function GuestProfileControls() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleOpenDialog = () => setDialogIsOpen(true);
    const handleCloseDialog = () => setDialogIsOpen(false);
    
    const handleOpenDialogLogIn = () => {
        setSelectedTab(0);
        handleOpenDialog();
    }
    const handleOpenDialogRegister = () => {
        setSelectedTab(1);
        handleOpenDialog();
    }

    return (
        <div>
            <Box display="flex" flexDirection="row">
                <Button variant="contained" color="secondary" onClick={handleOpenDialogLogIn}>
                    Log In
                </Button>
                <Button variant="contained" color="secondary" onClick={handleOpenDialogRegister}>
                    Register
                </Button>
            </Box>
            <AuthDialog isOpen={dialogIsOpen} defaultTab={selectedTab} handleClickDialogClosed={handleCloseDialog} />
        </div>
    );
}