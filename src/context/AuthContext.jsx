import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('tournament_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('tournament_user', JSON.stringify(userWithoutPassword));
      toast.success('Login successful!');
      navigate('/dashboard');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = (name, email, password, role) => {
    // Check if user already exists
    if (mockUsers.some((user) => user.email === email)) {
      toast.error('User already exists!');
      return false;
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role,
      tournaments: [],
      stats: {
        wins: 0,
        losses: 0,
        points: 0,
        achievements: [],
      },
      virtualMoney: 10000,
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call
    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('tournament_user', JSON.stringify(userWithoutPassword));
    
    toast.success('Registration successful!');
    navigate('/dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tournament_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};