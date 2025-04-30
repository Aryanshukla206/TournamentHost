import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Trophy, Menu, X, LogIn, UserPlus, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-800 to-primary-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Trophy className="h-8 w-8 text-accent-400" />
              <span className="ml-2 text-xl font-bold">TourneyPro</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/features" className="hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link>
              <Link to="/contact" className="hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>

              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={logout}
                    className="bg-transparent hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium border border-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center bg-transparent hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium border border-white transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center bg-accent-500 hover:bg-accent-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent-300 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-700 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 hover:bg-primary-500"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary-600"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-accent-500 hover:bg-accent-600"
                  onClick={toggleMenu}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;