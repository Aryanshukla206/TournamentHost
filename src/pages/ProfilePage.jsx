import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTournament } from '../context/TournamentContext';
import { 
  User,
  Trophy,
  Award,
  Calendar,
  Edit,
  Mail,
  DollarSign,
  Camera,
  Settings
} from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { tournaments } = useTournament();
  const [userTournaments, setUserTournaments] = useState([]);
  
  useEffect(() => {
    if (currentUser && tournaments.length > 0) {
      // Filter tournaments based on user role
      const filteredTournaments = currentUser.role === 'host'
        ? tournaments.filter(t => t.hostId === currentUser.id)
        : tournaments.filter(t => 
            t.participants.some(p => p.userId === currentUser.id)
          );
      
      setUserTournaments(filteredTournaments);
    }
  }, [currentUser, tournaments]);

  // Prepare chart data
  const chartData = {
    labels: ['Wins', 'Losses', 'Draws'],
    datasets: [
      {
        label: 'Match Statistics',
        data: [currentUser?.stats?.wins || 0, currentUser?.stats?.losses || 0, 0],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Statistics'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
        <p className="text-neutral-600">
          Manage your profile information and view your performance statistics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-6">
            <div className="bg-primary-600 h-32 relative">
              <button className="absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="px-6 pt-0 pb-6 relative">
              <div className="w-20 h-20 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-2xl font-bold absolute -top-10 left-6 border-4 border-white">
                {currentUser.name.charAt(0)}
              </div>
              
              <div className="pt-12">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900">{currentUser.name}</h2>
                    <p className="text-neutral-600">
                      {currentUser.role === 'host' ? 'Tournament Host' : 'Player'}
                    </p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-800 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-4 space-y-2 text-neutral-700">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>Joined {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-neutral-400" />
                    <span>₹{currentUser.virtualMoney.toLocaleString()} Virtual Money</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Achievements</h3>
            
            {currentUser.stats.achievements.length > 0 ? (
              <div className="space-y-3">
                {currentUser.stats.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="bg-accent-100 p-2 rounded-md mr-3">
                      <Award className="h-5 w-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800">{achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Award className="h-10 w-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-neutral-500">No achievements yet</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Statistics & Tournaments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Statistics</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-neutral-500 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-primary-700 mt-1">{currentUser.stats.points}</p>
              </div>
              <div className="bg-success-50 p-4 rounded-lg">
                <p className="text-neutral-500 text-sm">Wins</p>
                <p className="text-2xl font-bold text-success-700 mt-1">{currentUser.stats.wins}</p>
              </div>
              <div className="bg-error-50 p-4 rounded-lg">
                <p className="text-neutral-500 text-sm">Losses</p>
                <p className="text-2xl font-bold text-error-700 mt-1">{currentUser.stats.losses}</p>
              </div>
            </div>
            
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          
          {/* Tournaments */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                {currentUser.role === 'host' ? 'Hosted Tournaments' : 'Participated Tournaments'}
              </h3>
              <Link 
                to={currentUser.role === 'host' ? '/dashboard/tournaments/create' : '/dashboard/tournaments/join'}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                {currentUser.role === 'host' ? 'Host New' : 'Join New'}
              </Link>
            </div>
            
            {userTournaments.length > 0 ? (
              <div className="space-y-3">
                {userTournaments.map(tournament => (
                  <Link 
                    key={tournament.id}
                    to={`/dashboard/tournaments/${tournament.id}`}
                    className="flex items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="bg-primary-100 p-2 rounded-md mr-3">
                      <Trophy className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-neutral-800">{tournament.name}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          tournament.status === 'upcoming'
                            ? 'bg-primary-100 text-primary-700' 
                            : tournament.status === 'live'
                              ? 'bg-success-100 text-success-700'
                              : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 mt-1">
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                <p className="text-neutral-700 font-medium mb-1">No tournaments yet</p>
                <p className="text-neutral-500 mb-4">
                  {currentUser.role === 'host'
                    ? "You haven't hosted any tournaments yet."
                    : "You haven't joined any tournaments yet."}
                </p>
                <Link
                  to={currentUser.role === 'host' ? '/dashboard/tournaments/create' : '/dashboard/tournaments/join'}
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {currentUser.role === 'host' ? 'Host a Tournament' : 'Join a Tournament'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;