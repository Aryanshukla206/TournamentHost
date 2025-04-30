import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTournament } from '../context/TournamentContext';
import { Trophy, Calendar, Users, Zap, PlusCircle, ArrowRight } from 'lucide-react';
import TournamentCard from '../components/tournament/TournamentCard';
import StatsCard from '../components/dashboard/StatsCard';
import UpcomingMatchesList from '../components/dashboard/UpcomingMatchesList';
import RecentActivityList from '../components/dashboard/RecentActivityList';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { tournaments, matches } = useTournament();
  const [userTournaments, setUserTournaments] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [stats, setStats] = useState({
    activeTournaments: 0,
    upcomingMatches: 0,
    totalParticipants: 0,
    sportsPlayed: 0,
  });
  
  useEffect(() => {
    if (currentUser && tournaments.length > 0) {
      // Filter tournaments based on user role
      const filteredTournaments = currentUser.role === 'host'
        ? tournaments.filter(t => t.hostId === currentUser.id)
        : tournaments.filter(t => 
            t.participants.some(p => p.userId === currentUser.id)
          );
      
      setUserTournaments(filteredTournaments);
      
      // Calculate stats
      const activeTournaments = filteredTournaments.filter(t => t.status === 'live').length;
      const allParticipants = filteredTournaments.reduce((acc, t) => acc + t.participants.length, 0);
      const uniqueSports = new Set(filteredTournaments.flatMap(t => t.sports)).size;
      
      // Get user's matches
      const userMatchList = matches.filter(m => 
        m.player1 === currentUser.id || m.player2 === currentUser.id ||
        filteredTournaments.some(t => t.id === m.tournamentId)
      );
      
      setUserMatches(userMatchList);
      
      setStats({
        activeTournaments,
        upcomingMatches: userMatchList.filter(m => m.status === 'pending').length,
        totalParticipants: allParticipants,
        sportsPlayed: uniqueSports,
      });
    }
  }, [currentUser, tournaments, matches]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">
            Welcome back, {currentUser?.name}! Here's what's happening with your tournaments.
          </p>
        </div>
        
        {currentUser?.role === 'host' && (
          <Link
            to="/dashboard/tournaments/create"
            className="mt-4 sm:mt-0 flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Tournament
          </Link>
        )}
        
        {currentUser?.role === 'player' && (
          <Link
            to="/dashboard/tournaments/join"
            className="mt-4 sm:mt-0 flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Join Tournament
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Tournaments"
          value={stats.activeTournaments}
          icon={<Trophy className="h-6 w-6 text-primary-500" />}
          bgColor="bg-primary-50"
          textColor="text-primary-700"
        />
        <StatsCard
          title="Upcoming Matches"
          value={stats.upcomingMatches}
          icon={<Calendar className="h-6 w-6 text-accent-500" />}
          bgColor="bg-accent-50"
          textColor="text-accent-700"
        />
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={<Users className="h-6 w-6 text-secondary-500" />}
          bgColor="bg-secondary-50"
          textColor="text-secondary-700"
        />
        <StatsCard
          title="Sports Played"
          value={stats.sportsPlayed}
          icon={<Zap className="h-6 w-6 text-success-500" />}
          bgColor="bg-success-50"
          textColor="text-success-700"
        />
      </div>

      {/* Tournaments */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Your Tournaments</h2>
          <Link 
            to={currentUser?.role === 'host' ? '/dashboard/tournaments/create' : '/dashboard/tournaments/join'}
            className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
          >
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {userTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTournaments.slice(0, 3).map(tournament => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No tournaments yet</h3>
            <p className="text-neutral-500 mb-6">
              {currentUser?.role === 'host'
                ? "You haven't created any tournaments yet."
                : "You haven't joined any tournaments yet."}
            </p>
            <Link
              to={currentUser?.role === 'host' ? '/dashboard/tournaments/create' : '/dashboard/tournaments/join'}
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {currentUser?.role === 'host' ? (
                <>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create a Tournament
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Join a Tournament
                </>
              )}
            </Link>
          </div>
        )}
      </div>

      {/* 2-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Matches */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Upcoming Matches</h2>
            <Link to="/dashboard/games" className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium">
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <UpcomingMatchesList matches={userMatches.filter(m => m.status === 'pending').slice(0, 5)} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Recent Activity</h2>
          </div>
          
          <RecentActivityList matches={userMatches.filter(m => m.status === 'completed').slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;