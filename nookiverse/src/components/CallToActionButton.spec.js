import React from 'react';
import ReactDOM from 'react-dom';
import CallToActionButton from './CallToActionButton';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CallToActionButton />, div);
});