import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Users, 
  Tag, 
  Medal, 
  Share, 
  PlusCircle,
  User,
  ClipboardCopy,
  CheckCircle,
  Clock,
  Copy,
  Zap
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { mockUsers } from '../data/mockData';

const TournamentPage = () => {
  const { id } = useParams();
  const { tournaments, sports, matches } = useTournament();
  const { currentUser } = useAuth();
  const [tournament, setTournament] = useState(null);
  const [tournamentSports, setTournamentSports] = useState([]);
  const [tournamentMatches, setTournamentMatches] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    // Find tournament
    const foundTournament = tournaments.find(t => t.id === parseInt(id) || t.id === id);
    
    if (foundTournament) {
      setTournament(foundTournament);
      
      // Find sports for this tournament
      const foundSports = sports.filter(s => s.tournamentId === foundTournament.id);
      setTournamentSports(foundSports);
      
      // Find matches for this tournament
      const foundMatches = matches.filter(m => m.tournamentId === foundTournament.id);
      setTournamentMatches(foundMatches);
      
      // Get participant details
      const participantUsers = foundTournament.participants.map(p => {
        const user = mockUsers.find(u => u.id === p.userId);
        return { ...user, status: p.status };
      }).filter(Boolean);
      
      setParticipants(participantUsers);
    }
  }, [id, tournaments, sports, matches]);

  if (!tournament) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const copyTournamentCode = () => {
    navigator.clipboard.writeText(tournament.uniqueCode)
      .then(() => {
        setIsCopied(true);
        toast.success('Tournament code copied to clipboard!');
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy code');
      });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">Upcoming</span>;
      case 'live':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-700">Live</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-700">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Tournament Header */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold text-neutral-900 mr-3">{tournament.name}</h1>
              {getStatusBadge(tournament.status)}
            </div>
            <p className="text-neutral-600 mb-4">{tournament.rules}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                <span>
                  {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-neutral-400" />
                <span>{participants.length} Participants</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-neutral-400" />
                <div 
                  className="cursor-pointer flex items-center bg-neutral-100 px-2 py-1 rounded-md hover:bg-neutral-200 transition-colors"
                  onClick={copyTournamentCode}
                >
                  <span className="mr-1">Code: {tournament.uniqueCode}</span>
                  {isCopied ? 
                    <CheckCircle className="h-3.5 w-3.5 text-success-600" /> : 
                    <Copy className="h-3.5 w-3.5 text-neutral-400" />
                  }
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3">
            <button 
              className="flex items-center text-neutral-600 hover:text-primary-600 bg-neutral-100 hover:bg-neutral-200 px-3 py-2 rounded-md transition-colors"
              onClick={copyTournamentCode}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </button>
            
            {tournament.status === 'upcoming' && currentUser?.role === 'host' && tournament.hostId === currentUser.id && (
              <Link
                to={`/dashboard/tournaments/${tournament.id}/auction`}
                className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                Start Auction
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 mb-6">
        <div className="border-b border-neutral-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'participants'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'results'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Results
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Tournament Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                  <h3 className="text-lg font-medium text-neutral-800 mb-3">Sports</h3>
                  
                  {tournament.sports.length > 0 ? (
                    <div className="space-y-2">
                      {tournament.sports.map((sport, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                          <span>{sport}</span>
                          <Link
                            to="#"
                            className="text-xs text-primary-600 hover:text-primary-800"
                          >
                            Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500">No sports added yet.</p>
                  )}
                  
                  {currentUser?.role === 'host' && tournament.hostId === currentUser.id && (
                    <button
                      className="mt-4 w-full flex items-center justify-center text-primary-600 hover:text-primary-800 bg-white border border-primary-300 px-3 py-2 rounded-md transition-colors text-sm"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Sport
                    </button>
                  )}
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                  <h3 className="text-lg font-medium text-neutral-800 mb-3">Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-neutral-500">Participants</p>
                      <p className="text-2xl font-semibold text-primary-700">{participants.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-neutral-500">Sports</p>
                      <p className="text-2xl font-semibold text-primary-700">{tournament.sports.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-neutral-500">Matches</p>
                      <p className="text-2xl font-semibold text-primary-700">{tournamentMatches.length}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-neutral-500">Completed</p>
                      <p className="text-2xl font-semibold text-primary-700">
                        {tournamentMatches.filter(m => m.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <h3 className="text-lg font-medium text-neutral-800 mb-3">Recent Activity</h3>
                
                {tournamentMatches.length > 0 ? (
                  <div className="divide-y divide-neutral-200">
                    {tournamentMatches.slice(0, 3).map(match => (
                      <div key={match.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-neutral-800">
                              {match.team1 || `Player ${match.player1}`} vs {match.team2 || `Player ${match.player2}`}
                            </p>
                            <p className="text-sm text-neutral-500">
                              {match.status === 'completed' 
                                ? `Final Score: ${match.score}`
                                : 'Scheduled'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            match.status === 'completed'
                              ? 'bg-success-100 text-success-700'
                              : 'bg-primary-100 text-primary-700'
                          }`}>
                            {match.status === 'completed' ? 'Completed' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500">No recent activity.</p>
                )}
              </div>
            </div>
          )}

          {/* Participants Tab */}
          {activeTab === 'participants' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Participants</h2>
                
                {currentUser?.role === 'host' && tournament.hostId === currentUser.id && (
                  <button
                    className="flex items-center text-primary-600 hover:text-primary-800 text-sm"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Invite Player
                  </button>
                )}
              </div>
              
              {participants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participants.map(participant => (
                    <div key={participant.id} className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-lg">
                          {participant.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-neutral-900">{participant.name}</p>
                          <p className="text-xs text-neutral-500">
                            {participant.role === 'host' ? 'Tournament Host' : 'Player'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 text-center text-sm">
                        <div className="bg-neutral-50 p-2 rounded">
                          <p className="text-neutral-500">Wins</p>
                          <p className="font-semibold text-neutral-800">{participant.stats.wins}</p>
                        </div>
                        <div className="bg-neutral-50 p-2 rounded">
                          <p className="text-neutral-500">Losses</p>
                          <p className="font-semibold text-neutral-800">{participant.stats.losses}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-2">No participants yet</h3>
                  <p className="text-neutral-500 mb-6">
                    Share your tournament code to invite players to join.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Match Schedule</h2>
                
                {currentUser?.role === 'host' && tournament.hostId === currentUser.id && (
                  <button
                    className="flex items-center text-primary-600 hover:text-primary-800 text-sm"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Create Match
                  </button>
                )}
              </div>
              
              {tournamentMatches.length > 0 ? (
                <div className="divide-y divide-neutral-200">
                  {tournamentMatches.map(match => (
                    <div key={match.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-3 md:mb-0">
                          <p className="font-medium text-neutral-900 mb-1">
                            {match.team1 || `Player ${match.player1}`} vs {match.team2 || `Player ${match.player2}`}
                          </p>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(match.date)}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>
                              {new Date(match.date).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            match.status === 'completed'
                              ? 'bg-success-100 text-success-700'
                              : 'bg-primary-100 text-primary-700'
                          }`}>
                            {match.status === 'completed' ? 'Completed' : 'Upcoming'}
                          </span>
                          
                          {currentUser?.role === 'host' && tournament.hostId === currentUser.id && match.status !== 'completed' && (
                            <button className="ml-3 text-sm text-primary-600 hover:text-primary-800">
                              Update
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-2">No matches scheduled</h3>
                  <p className="text-neutral-500">
                    No matches have been scheduled for this tournament yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Tournament Results</h2>
              
              {tournamentMatches.filter(m => m.status === 'completed').length > 0 ? (
                <div className="space-y-6">
                  {tournament.sports.map((sport, index) => (
                    <div key={index} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-neutral-50 p-4 border-b border-neutral-200">
                        <h3 className="font-semibold text-neutral-800">{sport}</h3>
                      </div>
                      
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-neutral-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                  Match
                                </th>
                                <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                  Result
                                </th>
                                <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                  Winner
                                </th>
                                <th className="px-4 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                              {tournamentMatches
                                .filter(m => m.status === 'completed')
                                .map(match => (
                                  <tr key={match.id} className="hover:bg-neutral-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                                      {match.team1 || `Player ${match.player1}`} vs {match.team2 || `Player ${match.player2}`}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                                      {match.score}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <Medal className="h-4 w-4 text-accent-500 mr-1" />
                                        <span className="text-sm font-medium text-neutral-800">
                                          {match.winner}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600 text-right">
                                      {formatDate(match.date)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Medal className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-700 mb-2">No results yet</h3>
                  <p className="text-neutral-500">
                    Match results will appear here once matches are completed.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;