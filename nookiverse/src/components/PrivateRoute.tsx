import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

type PrivateRouteProps = RouteProps & {
    component: React.ComponentType<any>
}

export default function PrivateRoute({ component: PrivateComponent, ...rest }: PrivateRouteProps) {
    const authState = useContext(AuthContext);

    return (
            <Route {...rest} render={(props) => 
                    authState.authToken ? 
                    (<PrivateComponent { ...props } />) : 
                    (<Redirect to="/" />) 
                }
            />
        )
}