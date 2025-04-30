import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Trophy,
  Users,
  Calendar,
  PlusCircle,
  Compass,
  Dices,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ to, icon, label }) => {
    return (
      <Link
        to={to}
        className={`flex items-center px-4 py-3 mt-1 transition-colors duration-200 ${
          isActive(to)
            ? 'bg-primary-700 text-white rounded-md'
            : 'text-neutral-500 hover:text-primary-700 hover:bg-primary-50 rounded-md'
        }`}
      >
        {icon}
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>
    );
  };

  return (
    <div
      className={`bg-white border-r border-neutral-200 shadow-sm transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <Link to="/dashboard" className="flex items-center">
            <Trophy className="h-6 w-6 text-primary-700" />
            {!collapsed && <span className="ml-2 font-bold text-primary-800">TourneyPro</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-neutral-500 hover:text-primary-700 focus:outline-none"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 overflow-y-auto">
          <div className={`px-4 ${collapsed ? 'text-center' : ''}`}>
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Main</p>
          </div>

          <div className="mt-2">
            <NavItem to="/dashboard" icon={<Calendar size={20} />} label="Dashboard" />
            {currentUser?.role === 'host' && (
              <NavItem to="/dashboard/tournaments/create" icon={<PlusCircle size={20} />} label="Create Tournament" />
            )}
            <NavItem to="/dashboard/tournaments/join" icon={<Compass size={20} />} label="Join Tournament" />
          </div>

          <div className={`px-4 mt-6 ${collapsed ? 'text-center' : ''}`}>
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Activities</p>
          </div>

          <div className="mt-2">
            <NavItem to="/dashboard/games" icon={<Dices size={20} />} label="Games" />
            <NavItem to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
              {currentUser?.name.charAt(0)}
            </div>
            
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-neutral-800 truncate">{currentUser?.name}</p>
                <p className="text-xs text-neutral-500 truncate">
                  {currentUser?.role === 'host' ? 'Tournament Host' : 'Player'}
                </p>
              </div>
            )}
            
            <button
              onClick={logout}
              className={`text-neutral-500 hover:text-error-600 focus:outline-none ${
                collapsed ? 'ml-0 mt-3' : 'ml-auto'
              }`}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;