import React from 'react';
import PropTypes from 'prop-types';

import MemberProfileControls from './MemberProfileControls';

type ProfileControlsProps = {
    className: string,
    isLoggedIn: boolean
}

/**
 * Controls for users that toggle to different controls sets based on whether or not the user is logged in.
 * @param props
 */
export default function ProfileControls(props: ProfileControlsProps) {
        return (
            <div className={props.className}>
                {props.isLoggedIn ? <MemberProfileControls /> : 'Test'}
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