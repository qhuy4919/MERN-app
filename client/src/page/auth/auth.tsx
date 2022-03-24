import React from 'react';
import { Login, Register } from 'component';
import './auth.scss';

type AuthProps = {
    authRoute: string,
    [key: string]: string
}
export function Auth(props: AuthProps) {
    const { authRoute } = props;

    return (
        <div className="auth-panel">
            {authRoute === 'login' && <Login />}
            {authRoute === 'register' && <Register/>}
        </div>
    );
}
