import React from 'react';
import { Link } from 'react-router-dom';
import { useTournament } from '../../context/TournamentContext';
import { Calendar, Users, Tag, ChevronRight } from 'lucide-react';

const TournamentCard = ({ tournament }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">{tournament.name}</h3>
          {getStatusBadge(tournament.status)}
        </div>
        
        <div className="flex flex-col space-y-2 text-sm text-neutral-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
            <span>
              {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-neutral-400" />
            <span>{tournament.participants.length} Participants</span>
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-neutral-400" />
            <span>Code: {tournament.uniqueCode}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tournament.sports.map((sport, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded-full"
            >
              {sport}
            </span>
          ))}
        </div>
        
        <Link
          to={`/dashboard/tournaments/${tournament.id}`}
          className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          View details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;