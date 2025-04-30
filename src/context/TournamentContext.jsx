import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { mockTournaments, mockSports, mockMatches } from '../data/mockData';

const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [sports, setSports] = useState(mockSports);
  const [matches, setMatches] = useState(mockMatches);

  // Create a new tournament
  const createTournament = (tournamentData, hostId) => {
    const uniqueCode = generateUniqueCode();
    
    const newTournament = {
      id: uuidv4(),
      hostId,
      uniqueCode,
      participants: [{ userId: hostId, status: 'registered' }],
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      ...tournamentData,
    };

    setTournaments([...tournaments, newTournament]);
    toast.success('Tournament created successfully!');
    return newTournament;
  };

  // Join a tournament with a code
  const joinTournament = (code, userId) => {
    const tournamentIndex = tournaments.findIndex(t => t.uniqueCode === code);
    
    if (tournamentIndex === -1) {
      toast.error('Invalid tournament code');
      return false;
    }

    const tournament = tournaments[tournamentIndex];
    
    // Check if user is already in the tournament
    if (tournament.participants.some(p => p.userId === userId)) {
      toast.error('You are already participating in this tournament');
      return false;
    }

    // Add user to participants
    const updatedTournament = {
      ...tournament,
      participants: [
        ...tournament.participants,
        { userId, status: 'registered' }
      ]
    };

    // Update tournaments array
    const updatedTournaments = [...tournaments];
    updatedTournaments[tournamentIndex] = updatedTournament;

    setTournaments(updatedTournaments);
    toast.success('Successfully joined the tournament!');
    return updatedTournament;
  };

  // Add a sport to a tournament
  const addSport = (tournamentId, sportData) => {
    const newSport = {
      id: uuidv4(),
      tournamentId,
      participants: [],
      matches: [],
      ...sportData,
    };

    setSports([...sports, newSport]);
    toast.success(`${sportData.name} added to tournament!`);
    return newSport;
  };

  // Register for a sport in a tournament
  const registerForSport = (sportId, userId) => {
    const sportIndex = sports.findIndex(s => s.id === sportId);
    
    if (sportIndex === -1) {
      toast.error('Sport not found');
      return false;
    }

    const sport = sports[sportIndex];
    
    // Check if user is already registered
    if (sport.participants.includes(userId)) {
      toast.error('You are already registered for this sport');
      return false;
    }

    // Update sport with new participant
    const updatedSport = {
      ...sport,
      participants: [...sport.participants, userId]
    };

    const updatedSports = [...sports];
    updatedSports[sportIndex] = updatedSport;

    setSports(updatedSports);
    toast.success(`Successfully registered for ${sport.name}!`);
    return updatedSport;
  };

  // Create a match
  const createMatch = (matchData) => {
    const newMatch = {
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...matchData,
    };

    setMatches([...matches, newMatch]);
    return newMatch;
  };

  // Update match score
  const updateMatchScore = (matchId, score, winner) => {
    const matchIndex = matches.findIndex(m => m.id === matchId);
    
    if (matchIndex === -1) {
      toast.error('Match not found');
      return false;
    }

    const updatedMatch = {
      ...matches[matchIndex],
      score,
      winner,
      status: 'completed'
    };

    const updatedMatches = [...matches];
    updatedMatches[matchIndex] = updatedMatch;

    setMatches(updatedMatches);
    toast.success('Match score updated!');
    return updatedMatch;
  };

  // Helper function to generate a unique 6-character code
  const generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    let isUnique = false;

    while (!isUnique) {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      // Check if the code is unique
      isUnique = !tournaments.some(t => t.uniqueCode === code);
    }

    return code;
  };

  const value = {
    tournaments,
    sports,
    matches,
    createTournament,
    joinTournament,
    addSport,
    registerForSport,
    createMatch,
    updateMatchScore,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};