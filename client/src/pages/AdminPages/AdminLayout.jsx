import React from 'react';
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-200 gap-3'>
      <div className='bg-gray-400 w-2/12'>
        {/* Sidebar can be added here in the future */}
        <AdminSidebar />
      </div>
      <div className='bg-gray-100 w-full'>
        {/* Dashboard with Navbar and other things */}
        <AdminNavbar />
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;
