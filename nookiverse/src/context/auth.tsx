import React from 'react';

type AuthProps = {
    authTokens: string,
    setAuthTokens: Function
}

const defaultAuthProps = {
    authTokens: '',
    setAuthTokens: () => console.error('Default method called')
}

const AuthContext = React.createContext<AuthProps | null>(null);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

export function useAuth() {
    return React.useContext(AuthContext);
}