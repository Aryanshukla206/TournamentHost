import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Mail, Search } from 'lucide-react';

const DashboardHeader = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 py-3 px-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-neutral-800">
            {currentUser ? `Welcome, ${currentUser.name}` : 'Dashboard'}
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-xs flex-1 mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              placeholder="Search tournaments..."
            />
          </div>
        </div>
        
        {/* Notifications */}
        <div className="flex items-center space-x-4">
          <button className="text-neutral-600 hover:text-primary-700 focus:outline-none relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-accent-500 rounded-full"></span>
          </button>
          <button className="text-neutral-600 hover:text-primary-700 focus:outline-none relative">
            <Mail className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-primary-600 rounded-full"></span>
          </button>
          
          {/* Profile Menu */}
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <div className="h-8 w-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                {currentUser?.name.charAt(0)}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;