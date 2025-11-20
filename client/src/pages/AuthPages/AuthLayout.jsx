import React from 'react';
import Header from '../../components/AuthComponents/Header';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Header */}
            <Header />
            <div className=''>
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
