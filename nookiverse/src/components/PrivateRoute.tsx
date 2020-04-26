import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

type PrivateRouteProps = RouteProps & {
    component: React.ComponentType<any>
}

export default function PrivateRoute({ component: PrivateComponent, ...rest }: PrivateRouteProps) {

    return (
            <Route {...rest} render={(props) => (
                <div>
                    <IfFirebaseAuthed>
                        {() => (
                            <PrivateComponent { ...props } />
                        )}
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                        {() => (
                            <Redirect to="/" />
                        )}
                    </IfFirebaseUnAuthed>
                </div>
                )}
            />
        )
}