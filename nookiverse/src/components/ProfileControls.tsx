import React from 'react';
import PropTypes from 'prop-types';

import GuestProfileControls from './GuestProfileControls';
import MemberProfileControls from './MemberProfileControls';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

type ProfileControlsProps = {
    isLoggedIn: boolean
}

/**
 * Controls for users that toggle to different controls sets based on whether or not the user is logged in.
 * @param props
 */
export default function ProfileControls(props: ProfileControlsProps) {
    return (
        <div>
            <IfFirebaseAuthed>
                {() => (
                    <MemberProfileControls />
                )}
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
                {() => (
                    <GuestProfileControls /> 
                )}
            </IfFirebaseUnAuthed>
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