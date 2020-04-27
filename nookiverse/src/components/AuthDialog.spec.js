import React from 'react';
import ReactDOM from 'react-dom';
import AuthDialog from './AuthDialog';

it('renders without crashing when passed a callback function to close the dialog', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthDialog handleClickDialogClosed={() => null} />, div);
});