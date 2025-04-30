import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dices, ChevronRight as ChessKnight, Dice1, Target, Plus, ArrowUpRight, Clock, Users, X } from 'lucide-react';
import { mockGames } from '../data/mockData';

const GamesPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      name: 'Chess',
      description: 'Play a strategic game of chess with tournament participants.',
      icon: <ChessKnight className="h-6 w-6" />,
      color: 'bg-primary-100 text-primary-700',
      apiStatus: 'connected',
      matches: [
        { 
          id: 1, 
          opponent: 'John Doe', 
          status: 'upcoming', 
          date: '2023-06-20T14:00:00Z' 
        }
      ],
    },
    {
      id: 2,
      name: 'Ludo',
      description: 'Classic board game of luck and strategy.',
      icon: <Dice1 className="h-6 w-6" />,
      color: 'bg-accent-100 text-accent-700',
      apiStatus: 'connected',
      matches: [
        { 
          id: 2, 
          opponent: 'Jane Smith', 
          status: 'completed', 
          date: '2023-06-15T10:00:00Z',
          result: 'win' 
        }
      ],
    },
    {
      id: 3,
      name: 'Target Shooting',
      description: 'Test your precision in target shooting challenges.',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-error-100 text-error-700',
      apiStatus: 'not_connected',
      matches: [],
    },
  ];

  const upcomingMatches = [
    {
      id: 1,
      game: 'Chess',
      opponent: 'John Doe',
      tournament: 'Summer Championship 2023',
      date: '2023-06-20T14:00:00Z',
    },
    {
      id: 2,
      game: 'Ludo',
      opponent: 'Emma Johnson',
      tournament: 'Winter Games 2023',
      date: '2023-06-25T16:30:00Z',
    },
  ];

  const completedMatches = [
    {
      id: 3,
      game: 'Chess',
      opponent: 'Michael Brown',
      tournament: 'Summer Championship 2023',
      date: '2023-06-10T11:00:00Z',
      result: 'loss',
      score: '0-1',
    },
    {
      id: 4,
      game: 'Ludo',
      opponent: 'Jane Smith',
      tournament: 'Summer Championship 2023',
      date: '2023-06-15T10:00:00Z',
      result: 'win',
      score: '42-38',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openGameModal = (game) => {
    setSelectedGame(game);
    setShowGameModal(true);
  };

  const closeGameModal = () => {
    setShowGameModal(false);
    setSelectedGame(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Games & Matches</h1>
        <p className="text-neutral-600">
          Manage your game integrations and view upcoming matches.
        </p>
      </div>
      
      {/* Games List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Game Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map(game => (
            <div 
              key={game.id}
              className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openGameModal(game)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`${game.color} p-2 rounded-md`}>
                  {game.icon}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  game.apiStatus === 'connected'
                    ? 'bg-success-100 text-success-700'
                    : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {game.apiStatus === 'connected' ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-neutral-900 mb-1">{game.name}</h3>
              <p className="text-sm text-neutral-600 mb-3">{game.description}</p>
              
              <div className="text-xs text-neutral-500">
                {game.matches.length > 0 
                  ? `${game.matches.length} match${game.matches.length > 1 ? 'es' : ''}`
                  : 'No matches scheduled'}
              </div>
            </div>
          ))}
          
          {/* Add Game Card */}
          <div className="border border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer text-center">
            <div className="bg-neutral-100 p-2 rounded-full mb-3">
              <Plus className="h-6 w-6 text-neutral-600" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">Add New Game</h3>
            <p className="text-sm text-neutral-600">
              Connect another game to track matches
            </p>
          </div>
        </div>
      </div>
      
      {/* Matches */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="border-b border-neutral-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Upcoming Matches
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'completed'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Completed Matches
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' && (
            <>
              {upcomingMatches.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {upcomingMatches.map(match => (
                    <div key={match.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-md ${
                              match.game === 'Chess' 
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-accent-100 text-accent-700'
                            }`}>
                              {match.game === 'Chess' 
                                ? <ChessKnight className="h-4 w-4" />
                                : <Dice1 className="h-4 w-4" />
                              }
                            </div>
                            <h3 className="font-medium text-neutral-900 ml-2">{match.game}</h3>
                          </div>
                          <p className="text-neutral-700 mt-1">vs. {match.opponent}</p>
                          <p className="text-sm text-neutral-500">{match.tournament}</p>
                        </div>
                        
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-center text-sm text-neutral-600 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(match.date)}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatTime(match.date)}</span>
                          </div>
                          <button className="mt-2 text-xs flex items-center bg-primary-600 hover:bg-primary-700 text-white px-2 py-1 rounded transition-colors">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            Join Match
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-2">No upcoming matches</h3>
                  <p className="text-neutral-500">
                    You don't have any upcoming matches scheduled at the moment.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {completedMatches.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {completedMatches.map(match => (
                    <div key={match.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-md ${
                              match.game === 'Chess' 
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-accent-100 text-accent-700'
                            }`}>
                              {match.game === 'Chess' 
                                ? <ChessKnight className="h-4 w-4" />
                                : <Dice1 className="h-4 w-4" />
                              }
                            </div>
                            <h3 className="font-medium text-neutral-900 ml-2">{match.game}</h3>
                          </div>
                          <p className="text-neutral-700 mt-1">vs. {match.opponent}</p>
                          <p className="text-sm text-neutral-500">{match.tournament}</p>
                        </div>
                        
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              match.result === 'win'
                                ? 'bg-success-100 text-success-700'
                                : 'bg-error-100 text-error-700'
                            }`}>
                              {match.result === 'win' ? 'Victory' : 'Defeat'}
                            </span>
                          </div>
                          <div className="text-sm text-neutral-600 mb-1">
                            Score: {match.score}
                          </div>
                          <div className="flex items-center text-xs text-neutral-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(match.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Dices className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-2">No completed matches</h3>
                  <p className="text-neutral-500">
                    You haven't completed any matches yet.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Game Modal */}
      {showGameModal && selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-neutral-200 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${selectedGame.color} p-2 rounded-md mr-3`}>
                  {selectedGame.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{selectedGame.name}</h3>
              </div>
              <button 
                onClick={closeGameModal}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-neutral-700 mb-6">{selectedGame.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-neutral-800 mb-3">Game Settings</h4>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-neutral-700">API Status</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedGame.apiStatus === 'connected'
                        ? 'bg-success-100 text-success-700'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {selectedGame.apiStatus === 'connected' ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  
                  {selectedGame.apiStatus === 'connected' ? (
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-700">Username</span>
                      <span className="text-neutral-900 font-medium">{currentUser.name}</span>
                    </div>
                  ) : (
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors">
                      Connect Account
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-neutral-800 mb-3">Matches</h4>
                
                {selectedGame.matches.length > 0 ? (
                  <div className="divide-y divide-neutral-200">
                    {selectedGame.matches.map(match => (
                      <div key={match.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-neutral-800">vs. {match.opponent}</p>
                            <div className="flex items-center text-xs text-neutral-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{formatDate(match.date)}, {formatTime(match.date)}</span>
                            </div>
                          </div>
                          
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              match.status === 'upcoming'
                                ? 'bg-primary-100 text-primary-700'
                                : match.result === 'win'
                                  ? 'bg-success-100 text-success-700'
                                  : 'bg-error-100 text-error-700'
                            }`}>
                              {match.status === 'upcoming' 
                                ? 'Upcoming' 
                                : match.result === 'win' ? 'Victory' : 'Defeat'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Users className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                    <p className="text-neutral-500">
                      No matches available for this game.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeGameModal}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
                
                {selectedGame.apiStatus === 'connected' && (
                  <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
                    Create New Match
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesPage;