import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GuestProfileControls from './GuestProfileControls';
import MemberProfileControls from './MemberProfileControls';

type ProfileControlsProps = {
    isLoggedIn: boolean
}

/**
 * Controls for users that toggle to different controls sets based on whether or not the user is logged in.
 * @param props
 */
export default function ProfileControls(props: ProfileControlsProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => setIsLoggedIn(true);
    const handleRegisterClick = () => console.log('User wants to register');
    const handleLogoutClick = () => setIsLoggedIn(false);

    return (
        <div>
            {
                isLoggedIn ? 
                <MemberProfileControls handleLogoutClick={handleLogoutClick} /> : 
                <GuestProfileControls 
                    handleLoginClick={handleLoginClick}
                    handleRegisterClick={handleRegisterClick}
                />
            }
        </div>
    )
}

ProfileControls.propTypes = {
    className: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
}

ProfileControls.defaultProps = {
    isLoggedIn: false
}