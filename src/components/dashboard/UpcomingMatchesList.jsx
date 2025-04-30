import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';

const UpcomingMatchesList = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-neutral-700 mb-2">No upcoming matches</h3>
        <p className="text-neutral-500">
          You don't have any upcoming matches scheduled at the moment.
        </p>
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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Unknown Player';
  };

  return (
    <div className="divide-y divide-neutral-200">
      {matches.map((match) => (
        <div key={match.id} className="py-4 first:pt-0 last:pb-0">
          <Link to={`/dashboard/tournaments/${match.tournamentId}`} className="block hover:bg-neutral-50 rounded-lg p-2 -mx-2 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-900">
                {match.team1 || getUserName(match.player1)} vs {match.team2 || getUserName(match.player2)}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                {match.status === 'pending' ? 'Upcoming' : match.status}
              </span>
            </div>
            <div className="flex items-center text-neutral-500 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(match.date)}
              <Clock className="h-3 w-3 ml-3 mr-1" />
              {formatTime(match.date)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMatchesList;