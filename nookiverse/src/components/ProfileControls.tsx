import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import GuestProfileControls from './GuestProfileControls';
import MemberProfileControls from './MemberProfileControls';
import { AuthContext } from '../context/auth';

type ProfileControlsProps = {
    isLoggedIn: boolean
}

/**
 * Controls for users that toggle to different controls sets based on whether or not the user is logged in.
 * @param props
 */
export default function ProfileControls(props: ProfileControlsProps) {
    const authState = useContext(AuthContext);
    const [ isLoggedIn, setIsLoggedIn ] = useState(authState.authToken ? true : false);

    const handleLoginClick = (email: string, password: string) => {
        setIsLoggedIn(true);
        authState.setAuthToken(email + password);
    }
    const handleRegisterClick = () => console.log('User wants to register');
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        authState.expireAuthToken();
    }

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