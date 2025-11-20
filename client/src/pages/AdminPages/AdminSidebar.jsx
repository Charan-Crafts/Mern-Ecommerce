import React from 'react';
import { ShoppingCart, LayoutDashboard, ChartColumnBig, Package, Receipt } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const sidebarItems = [
    { name: "Dashboard", link: "/admin", icon: <ChartColumnBig size={22} /> },
    { name: "Products", link: "/admin/products", icon: <Package size={22} /> },
    { name: "Orders", link: "/admin/orders", icon: <Receipt size={22} /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black rounded-xl">
            <LayoutDashboard size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold  text-black font-serif text-shadow-lg">
            Admin Panel
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            className="block"
            end
          >
            {({ isActive }) => (
              <div
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 font-medium text-lg
                  group relative overflow-hidden shadow-lg mb-4
                  ${isActive 
                    ? 'border-b-2 text-black shadow-2xl bg-gray-200' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:shadow-md'
                  }
                `}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-white"></span>
                )}

                {/* Icon */}
                <span className={isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'}>
                  {item.icon}
                </span>

                {/* Text */}
                <span className="tracking-wide text-2xl font-serif">
                  {item.name}
                </span>

                {/* Hover Effect Line (only on inactive) */}
                {!isActive && (
                  <span className="absolute inset-0 border-b-2 border-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Credit (Optional) */}
      <div className="p-6 border-t border-gray-200">
        <p className="text-xs text-center text-gray-500 font-medium tracking-widest uppercase">
          Zero Store © 2025
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;