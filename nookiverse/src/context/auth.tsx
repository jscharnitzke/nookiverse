import { createContext } from 'react';

type authState = {
    authToken: string;
    setAuthToken: Function;
    expireAuthToken: Function;
}

const initialAuthState: authState = {
    authToken: '',
    setAuthToken: () => {
        throw new Error('setAuthToken must be overridden');
    },
    expireAuthToken: () => {
        throw new Error('expireAuthToken must be overridden');
    }
}

export const AuthContext = createContext<authState>(initialAuthState);
