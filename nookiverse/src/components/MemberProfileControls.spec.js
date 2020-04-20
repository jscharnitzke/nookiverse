import React from 'react';
import ReactDOM from 'react-dom';
import MemberProfileControls from './MemberProfileControls';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemberProfileControls />, div);
});