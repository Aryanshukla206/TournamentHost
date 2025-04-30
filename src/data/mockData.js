// Mock Users
export const mockUsers = [
  {
    id: 1,
    name: 'John Host',
    email: 'host@example.com',
    password: 'password123',
    role: 'host',
    tournaments: [1, 2],
    stats: {
      wins: 15,
      losses: 5,
      points: 150,
      achievements: ['Tournament Creator', 'Sport Master'],
    },
    virtualMoney: 15000,
    createdAt: '2023-01-15T12:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Player',
    email: 'player@example.com',
    password: 'password123',
    role: 'player',
    tournaments: [1],
    stats: {
      wins: 8,
      losses: 2,
      points: 80,
      achievements: ['First Win', 'Tournament Joiner'],
    },
    virtualMoney: 10000,
    createdAt: '2023-01-20T14:30:00Z',
  },
];

// Mock Tournaments
export const mockTournaments = [
  {
    id: 1,
    name: 'Summer Championship 2023',
    hostId: 1,
    uniqueCode: 'SUM123',
    sports: ['Cricket', 'Football', 'Chess'],
    participants: [
      { userId: 1, status: 'registered' },
      { userId: 2, status: 'registered' },
    ],
    startDate: '2023-06-15T09:00:00Z',
    endDate: '2023-06-20T18:00:00Z',
    status: 'live',
    rules: 'Standard tournament rules apply.',
    createdAt: '2023-05-10T10:00:00Z',
  },
  {
    id: 2,
    name: 'Winter Games 2023',
    hostId: 1,
    uniqueCode: 'WIN456',
    sports: ['Chess', 'Ludo'],
    participants: [
      { userId: 1, status: 'registered' },
    ],
    startDate: '2023-12-10T09:00:00Z',
    endDate: '2023-12-15T18:00:00Z',
    status: 'upcoming',
    rules: 'Winter games special rules.',
    createdAt: '2023-11-05T15:30:00Z',
  },
];

// Mock Sports
export const mockSports = [
  {
    id: 1,
    tournamentId: 1,
    name: 'Cricket',
    type: 'team',
    maxPlayers: 11,
    participants: [1, 2],
    matches: [1],
  },
  {
    id: 2,
    tournamentId: 1,
    name: 'Chess',
    type: 'individual',
    maxPlayers: 1,
    participants: [1, 2],
    matches: [2],
  },
  {
    id: 3,
    tournamentId: 2,
    name: 'Ludo',
    type: 'individual',
    maxPlayers: 1,
    participants: [1],
    matches: [],
  },
];

// Mock Matches
export const mockMatches = [
  {
    id: 1,
    sportId: 1,
    tournamentId: 1,
    team1: 'Team Alpha',
    team2: 'Team Beta',
    score: '120-115',
    winner: 'Team Alpha',
    date: '2023-06-16T14:00:00Z',
    status: 'completed',
  },
  {
    id: 2,
    sportId: 2,
    tournamentId: 1,
    player1: 1,
    player2: 2,
    winner: null,
    date: '2023-06-17T10:00:00Z',
    status: 'pending',
  },
];

// Mock Auctions
export const mockAuctions = [
  {
    id: 1,
    tournamentId: 1,
    sportId: 1,
    teams: [
      {
        name: 'Team Alpha',
        captain: 1,
        players: [1],
        budget: 5000,
        bids: [],
      },
      {
        name: 'Team Beta',
        captain: 2,
        players: [2],
        budget: 5000,
        bids: [],
      },
    ],
    availablePlayers: [3, 4, 5, 6, 7, 8],
    status: 'open',
  },
];

// Mock Game Integrations
export const mockGames = [
  {
    id: 1,
    name: 'Chess',
    icon: 'chess',
    apiEndpoint: 'https://api.chess.com/pub/player/',
    status: 'available',
  },
  {
    id: 2,
    name: 'Ludo',
    icon: 'dice',
    apiEndpoint: 'https://api.ludo.com/games/',
    status: 'available',
  },
];