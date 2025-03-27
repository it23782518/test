// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-bold">Management System</h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Users Menu */}
              <div className="relative group">
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Users
                </button>
                <div className="absolute hidden group-hover:block bg-gray-700 min-w-[160px] rounded-md shadow-lg">
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white ${
                        isActive ? 'bg-gray-600 text-white' : ''
                      }`
                    }
                  >
                    User List
                  </NavLink>
                  <NavLink
                    to="/add-user"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white ${
                        isActive ? 'bg-gray-600 text-white' : ''
                      }`
                    }
                  >
                    Add User
                  </NavLink>
                </div>
              </div>

              {/* Staff Menu */}
              <div className="relative group">
                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Staff
                </button>
                <div className="absolute hidden group-hover:block bg-gray-700 min-w-[160px] rounded-md shadow-lg">
                  <NavLink
                    to="/staff"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white ${
                        isActive ? 'bg-gray-600 text-white' : ''
                      }`
                    }
                  >
                    Staff List
                  </NavLink>
                  <NavLink
                    to="/add-staff"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white ${
                        isActive ? 'bg-gray-600 text-white' : ''
                      }`
                    }
                  >
                    Add Staff
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;