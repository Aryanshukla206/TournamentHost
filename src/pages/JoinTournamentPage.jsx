import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTournament } from '../context/TournamentContext';
import { Compass, CheckCircle } from 'lucide-react';

const JoinTournamentPage = () => {
  const { currentUser } = useAuth();
  const { joinTournament } = useTournament();
  const navigate = useNavigate();
  
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!code.trim()) {
      setError('Please enter a tournament code');
      return;
    }
    
    setIsJoining(true);
    
    try {
      const tournament = joinTournament(code.toUpperCase(), currentUser.id);
      
      if (tournament) {
        // Show success message
        setSuccess(true);
        
        // Redirect to tournament page after short delay
        setTimeout(() => {
          navigate(`/dashboard/tournaments/${tournament.id}`);
        }, 1500);
      } else {
        setError('Failed to join tournament. Invalid code or you are already a participant.');
      }
    } catch (error) {
      console.error('Error joining tournament:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-md border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-success-100 p-3">
              <CheckCircle className="h-12 w-12 text-success-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Successfully Joined!</h2>
          <p className="text-neutral-600 mb-4">
            You have joined the tournament. Redirecting you to the tournament page...
          </p>
          <div className="animate-pulse">
            <div className="h-1 w-full bg-primary-200 rounded">
              <div className="h-1 bg-primary-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Join a Tournament</h1>
        <p className="text-neutral-600">
          Enter the tournament code provided by the host to join an existing tournament.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        {error && (
          <div className="mb-6 bg-error-50 text-error-700 p-4 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-neutral-700 mb-1">
                Tournament Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Compass className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 uppercase"
                  placeholder="Enter 6-character code (e.g., ABC123)"
                  maxLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Tournament codes are typically 6 characters and can be found in the tournament invitation.
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isJoining}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                {isJoining ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Compass className="h-5 w-5 mr-2" />
                    Join Tournament
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-8 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
          <h3 className="text-sm font-semibold text-neutral-800 mb-2">Need a code?</h3>
          <p className="text-sm text-neutral-600">
            Tournament codes are provided by tournament hosts. If you haven't received a code, ask the tournament organizer to share it with you.
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Demo Tournament Codes</h2>
        <p className="text-neutral-600 mb-4">
          For demonstration purposes, you can use these tournament codes:
        </p>
        
        <div className="space-y-3">
          <div className="bg-primary-50 p-3 rounded-md border border-primary-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-primary-800">SUM123</p>
              <p className="text-sm text-neutral-600">Summer Championship 2023</p>
            </div>
            <button
              onClick={() => setCode('SUM123')}
              className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Use
            </button>
          </div>
          
          <div className="bg-primary-50 p-3 rounded-md border border-primary-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-primary-800">WIN456</p>
              <p className="text-sm text-neutral-600">Winter Games 2023</p>
            </div>
            <button
              onClick={() => setCode('WIN456')}
              className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTournamentPage;