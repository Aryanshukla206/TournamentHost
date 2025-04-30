import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

const RecentActivityList = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-neutral-700 mb-2">No recent activity</h3>
        <p className="text-neutral-500">
          You don't have any recent match activity to display.
        </p>
      </div>
    );
  }

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
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
            <div className="flex items-start">
              <div className="bg-accent-100 p-2 rounded-lg mr-3">
                <Trophy className="h-5 w-5 text-accent-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900 mb-1">
                  {match.team1 || getUserName(match.player1)} vs {match.team2 || getUserName(match.player2)}
                </p>
                <p className="text-xs text-neutral-500 mb-2">
                  {match.score}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded-full">
                    {match.winner === 'Team Alpha' || match.winner === 1 ? 'Team Alpha won' : 'Team Beta won'}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {timeAgo(match.date)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;