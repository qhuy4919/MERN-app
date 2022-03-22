import React from 'react';
import { Login } from 'component';

type AuthProps = {
    authRoute: string,
    [key: string]: string
}
export function Auth(props: AuthProps) {
    const { authRoute } = props;

    return (
        <div className="">
            {
                authRoute === 'Login' && <Login />
            }
        </div>
    );
}
