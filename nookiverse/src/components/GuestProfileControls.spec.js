import React from 'react';
import ReactDOM from 'react-dom';
import GuestProfileControls from './GuestProfileControls';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GuestProfileControls />, div);
});