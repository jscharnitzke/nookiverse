import React from 'react';
import ReactDOM from 'react-dom';
import ProfileControls from './ProfileControls';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileControls />, div);
});