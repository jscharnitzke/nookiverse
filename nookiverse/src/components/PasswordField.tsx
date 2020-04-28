import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type PasswordFieldProps = {
    password: string,
    passwordLabel: string,
    setPassword: Function,
    shouldValidate: boolean
}

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
}

export default function PasswordField(props: PasswordFieldProps) {
    const [passwordError,  setPasswordError] =  useState(false);
    const [passwordHelperText, setPasswordHelperText] =  useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = () => {
        props.password.length < 12 && props.shouldValidate ? passwordTooShort() : passwordIsValid();
    }

    const passwordTooShort = () => {
        setPasswordHelperText('Password must be at least 12 characters');
        setPasswordError(true);
    }
    
    const passwordIsValid = () => {
        setPasswordHelperText('');
        setPasswordError(false);
    }
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="password" required>{props.passwordLabel}</InputLabel>
            <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={props.password}
                required
                onChange={e => {
                    props.setPassword(e.target.value);
                    validatePassword();
                }}
                error={passwordError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visilibity"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText error={passwordError}>{passwordHelperText}</FormHelperText>
        </FormControl>
    )
}

PasswordField.propTypes = {
    password: PropTypes.string.isRequired,
    passwordLabel: PropTypes.string,
    setPassword: PropTypes.func.isRequired,
    shouldValidate: PropTypes.bool.isRequired
}

PasswordField.defaultProps = {
    password: '',
    passwordLabel: 'Password',
    setPassword: () => {throw new Error('setPassword must be overridden'); },
    shouldValidate: true
}