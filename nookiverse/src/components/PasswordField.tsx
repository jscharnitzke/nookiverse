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

type CallbackFunctionHandlePasswordErrors = (errorText: string) => void;

type PasswordFieldProps = {
    disabled: boolean,
    handleErrors: CallbackFunctionHandlePasswordErrors,
    helperText: string,
    label: string,
    password: string,
    setPassword: Function,
    setPasswordIsValid: Function,
    shouldValidate: boolean,
}

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
}

export default function PasswordField(props: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = () => {
        props.password.length < 12 && props.shouldValidate ? passwordTooShort() : passwordIsValid();
    }

    const passwordTooShort = () => {
        props.handleErrors('Password must be at least 12 characters');
        props.setPasswordIsValid(false);
    }
    
    const passwordIsValid = () => {
        props.handleErrors('');
        props.setPasswordIsValid(true);
    }
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl fullWidth disabled={props.disabled}>
            <InputLabel htmlFor="password" required>{props.label}</InputLabel>
            <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={props.password}
                required
                onChange={e => {
                    props.setPassword(e.target.value);
                    validatePassword();
                }}
                error={props.helperText !== ''}
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
            <FormHelperText error={props.helperText !== ''}>{props.helperText}</FormHelperText>
        </FormControl>
    )
}

PasswordField.propTypes = {
    disabled: PropTypes.bool.isRequired,
    handleErrors: PropTypes.func.isRequired,
    helperText: PropTypes.string.isRequired,
    label: PropTypes.string,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    setPasswordIsValid: PropTypes.func.isRequired,
    shouldValidate: PropTypes.bool.isRequired
}

PasswordField.defaultProps = {
    disabled: false,
    handleErrors: () => {throw new Error('handlePasswordErrors must be overridden'); },
    helperText: '',
    label: 'Password',
    password: '',
    setPassword: () => {throw new Error('setPassword must be overridden'); },
    setPasswordIsValid: () => null,
    shouldValidate: true
}