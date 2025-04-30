import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Clock,
  DollarSign,
  ChevronsUp,
  ChevronsDown,
  Award,
  User,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { mockUsers, mockAuctions } from '../data/mockData';

const AuctionPage = () => {
  const { id } = useParams();
  const { tournaments } = useTournament();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [tournament, setTournament] = useState(null);
  const [auction, setAuction] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [bidAmount, setBidAmount] = useState(1000);
  const [highestBid, setHighestBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState('standby'); // standby, active, sold, complete
  
  // Mock data for demonstration
  const availablePlayers = [
    { id: 3, name: 'Alex Smith', avatar: 'A', stats: { batting: 85, bowling: 65, fielding: 75 } },
    { id: 4, name: 'Emma Johnson', avatar: 'E', stats: { batting: 70, bowling: 90, fielding: 80 } },
    { id: 5, name: 'Michael Brown', avatar: 'M', stats: { batting: 90, bowling: 60, fielding: 85 } },
    { id: 6, name: 'Olivia Davis', avatar: 'O', stats: { batting: 65, bowling: 85, fielding: 90 } },
  ];
  
  useEffect(() => {
    // Find tournament
    const foundTournament = tournaments.find(t => t.id === parseInt(id) || t.id === id);
    
    if (foundTournament) {
      setTournament(foundTournament);
      
      // Find or create auction
      const foundAuction = mockAuctions.find(a => a.tournamentId === foundTournament.id);
      
      if (foundAuction) {
        setAuction(foundAuction);
      }
    }
  }, [id, tournaments]);

  // Initialize first player when auction is loaded
  useEffect(() => {
    if (auction && availablePlayers.length > 0) {
      setCurrentPlayer(availablePlayers[0]);
    }
  }, [auction]);
  
  // Timer countdown
  useEffect(() => {
    let interval = null;
    
    if (isAuctionActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isAuctionActive) {
      // Player sold when timer reaches zero
      setIsAuctionActive(false);
      setAuctionStatus('sold');
    }
    
    return () => clearInterval(interval);
  }, [isAuctionActive, timer]);

  if (!tournament || !auction) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const startAuction = () => {
    setTimer(30);
    setHighestBid(1000); // Starting bid
    setHighestBidder('Team Alpha');
    setIsAuctionActive(true);
    setAuctionStatus('active');
    toast.success('Auction started!');
  };
  
  const placeBid = () => {
    if (bidAmount <= highestBid) {
      toast.error('Bid must be higher than current highest bid');
      return;
    }
    
    setHighestBid(bidAmount);
    setHighestBidder('Team Beta');
    setTimer(15); // Reset timer on new bid
    toast.success('Bid placed successfully!');
  };
  
  const incrementBid = () => {
    setBidAmount(prev => prev + 100);
  };
  
  const decrementBid = () => {
    if (bidAmount > highestBid + 100) {
      setBidAmount(prev => prev - 100);
    }
  };
  
  const confirmSold = () => {
    toast.success(`Player sold to ${highestBidder} for ₹${highestBid.toLocaleString()}`);
    
    // Move to next player
    const currentIndex = availablePlayers.findIndex(p => p.id === currentPlayer.id);
    if (currentIndex < availablePlayers.length - 1) {
      setCurrentPlayer(availablePlayers[currentIndex + 1]);
      setAuctionStatus('standby');
      setBidAmount(1000);
      setHighestBid(0);
      setHighestBidder(null);
    } else {
      // All players have been auctioned
      setAuctionStatus('complete');
      toast.success('Auction completed!');
    }
  };
  
  const skipPlayer = () => {
    const currentIndex = availablePlayers.findIndex(p => p.id === currentPlayer.id);
    if (currentIndex < availablePlayers.length - 1) {
      setCurrentPlayer(availablePlayers[currentIndex + 1]);
      setAuctionStatus('standby');
      setIsAuctionActive(false);
      setBidAmount(1000);
      setHighestBid(0);
      setHighestBidder(null);
      toast('Player skipped', { icon: '⏭️' });
    }
  };
  
  const finishAuction = () => {
    navigate(`/dashboard/tournaments/${tournament.id}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">{tournament.name} - Auction</h1>
        <p className="text-neutral-600">
          Bid for players to form your team for the tournament.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Player Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            {auctionStatus === 'complete' ? (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-success-100 p-3">
                    <Award className="h-12 w-12 text-success-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Auction Completed!</h2>
                <p className="text-neutral-600 mb-6">
                  All players have been successfully auctioned. Teams are now ready for the tournament.
                </p>
                <button
                  onClick={finishAuction}
                  className="inline-flex items-center justify-center px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                >
                  Return to Tournament
                </button>
              </div>
            ) : (
              <>
                {/* Player Header */}
                <div className="bg-primary-50 border-b border-primary-100 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {currentPlayer?.avatar}
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-neutral-900">{currentPlayer?.name}</h2>
                        <p className="text-neutral-600">Player ID: {currentPlayer?.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        auctionStatus === 'active' 
                          ? 'bg-success-100 text-success-700' 
                          : auctionStatus === 'sold'
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {auctionStatus === 'active' 
                          ? 'Bidding Active' 
                          : auctionStatus === 'sold'
                            ? 'Sold'
                            : 'Standby'}
                      </div>
                      
                      {isAuctionActive && (
                        <div className="flex items-center mt-2">
                          <Clock className="h-4 w-4 text-error-600 mr-1" />
                          <span className={`font-mono ${timer < 10 ? 'text-error-600' : 'text-neutral-700'}`}>
                            {timer}s
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Player Details */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">Player Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <p className="text-sm text-neutral-500">Batting</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-success-500 h-2 rounded-full" 
                              style={{ width: `${currentPlayer?.stats.batting}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-neutral-900">
                            {currentPlayer?.stats.batting}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <p className="text-sm text-neutral-500">Bowling</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${currentPlayer?.stats.bowling}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-neutral-900">
                            {currentPlayer?.stats.bowling}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <p className="text-sm text-neutral-500">Fielding</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-accent-500 h-2 rounded-full" 
                              style={{ width: `${currentPlayer?.stats.fielding}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-neutral-900">
                            {currentPlayer?.stats.fielding}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Bid */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">Current Bid</h3>
                    <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-neutral-500">Highest Bid</p>
                          <p className="text-2xl font-bold text-primary-700">
                            {highestBid > 0 ? `₹${highestBid.toLocaleString()}` : 'No bids yet'}
                          </p>
                        </div>
                        
                        {highestBidder && (
                          <div>
                            <p className="text-sm text-neutral-500">Highest Bidder</p>
                            <p className="text-lg font-semibold text-neutral-800">{highestBidder}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Auction Controls */}
                  {currentUser?.role === 'host' && tournament.hostId === currentUser.id && (
                    <div>
                      <h3 className="text-lg font-medium text-neutral-800 mb-3">Auction Controls</h3>
                      <div className="flex flex-wrap gap-3">
                        {auctionStatus === 'standby' && (
                          <button
                            onClick={startAuction}
                            className="flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
                          >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Start Bidding
                          </button>
                        )}
                        
                        {auctionStatus === 'active' && (
                          <button
                            onClick={() => {
                              setIsAuctionActive(false);
                              setAuctionStatus('sold');
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-md transition-colors"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Sold
                          </button>
                        )}
                        
                        {auctionStatus === 'sold' && (
                          <button
                            onClick={confirmSold}
                            className="flex items-center justify-center px-4 py-2 bg-success-600 hover:bg-success-700 text-white font-medium rounded-md transition-colors"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Confirm Sale
                          </button>
                        )}
                        
                        {(auctionStatus === 'standby' || auctionStatus === 'active') && (
                          <button
                            onClick={skipPlayer}
                            className="flex items-center justify-center px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium rounded-md transition-colors"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Skip Player
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Right Column - Bidding & Players List */}
        <div className="space-y-6">
          {/* Bidding Panel */}
          {auctionStatus !== 'complete' && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="bg-primary-700 text-white p-4">
                <h3 className="font-semibold">Place Your Bid</h3>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-neutral-600">Your Team</p>
                  <p className="font-semibold text-neutral-800">Team Beta</p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-neutral-600">Available Budget</p>
                  <p className="font-semibold text-primary-700">₹5,000</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Bid Amount
                  </label>
                  <div className="flex">
                    <button
                      onClick={decrementBid}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-l-md transition-colors"
                    >
                      <ChevronsDown className="h-5 w-5" />
                    </button>
                    <div className="flex-1 border-y border-neutral-300 bg-neutral-50 px-3 py-2 text-center">
                      <span className="text-lg font-semibold">₹{bidAmount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={incrementBid}
                      className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-r-md transition-colors"
                    >
                      <ChevronsUp className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Minimum bid: ₹{(highestBid + 100).toLocaleString()}
                  </p>
                </div>
                
                <button
                  onClick={placeBid}
                  disabled={auctionStatus !== 'active' || bidAmount <= highestBid}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    auctionStatus === 'active' && bidAmount > highestBid
                      ? 'bg-accent-600 hover:bg-accent-700 text-white'
                      : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Place Bid
                </button>
                
                {auctionStatus !== 'active' && (
                  <div className="mt-3 flex items-center text-sm text-neutral-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Bidding not active</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Available Players */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="bg-neutral-50 p-4 border-b border-neutral-200">
              <h3 className="font-semibold text-neutral-800">Available Players</h3>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              {availablePlayers.map(player => (
                <div 
                  key={player.id}
                  className={`p-3 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors ${
                    currentPlayer?.id === player.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
                      {player.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-neutral-800">{player.name}</p>
                      <div className="flex items-center text-xs text-neutral-500">
                        <span>Batting: {player.stats.batting}</span>
                        <span className="mx-1">•</span>
                        <span>Bowling: {player.stats.bowling}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Auction Results */}
          {auctionStatus === 'complete' && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="bg-success-50 p-4 border-b border-success-100">
                <h3 className="font-semibold text-success-800">Auction Results</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-2">Team Alpha</h4>
                    <div className="bg-neutral-50 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <span>Players:</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span>Total Spent:</span>
                        <span className="font-semibold text-primary-700">₹3,500</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span>Remaining Budget:</span>
                        <span className="font-semibold text-success-700">₹1,500</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-2">Team Beta</h4>
                    <div className="bg-neutral-50 rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <span>Players:</span>
                        <span className="font-semibold">1</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span>Total Spent:</span>
                        <span className="font-semibold text-primary-700">₹2,200</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span>Remaining Budget:</span>
                        <span className="font-semibold text-success-700">₹2,800</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={finishAuction}
                  className="w-full mt-4 py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
                >
                  Return to Tournament
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;