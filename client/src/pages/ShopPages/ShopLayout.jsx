import React from 'react';
import ShopNavbar from '../../components/ShopComponents/ShopNavbar';
import { Outlet } from 'react-router-dom';

const ShopLayout = () => {
    return (
        <div>
            <h1>Shop Layout</h1>
            <ShopNavbar />
            <Outlet />
        </div>
    );
}

export default ShopLayout;
