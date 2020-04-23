import React, { useState } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

class PrivateRouteComponent extends React.Component {
    render() {
        return (
            <div {...this.props}></div>
        );
    }
}

export default function PrivateRoute({ component: Component, ...rest }: RouteProps) {
    const [authToken, setAuthToken] = useState();

    return (
            <Route {...rest} render={(props) => 
                    authToken ? 
                    (<PrivateRouteComponent { ...props } />) : 
                    (<Redirect to="/" />) 
                }
            />
        )
}