import gameFreeFire from "@/assets/game-freefire.jpg";
import gameBgmi from "@/assets/game-bgmi.jpg";

export interface Tournament {
  id: string;
  gameName: string;
  gameImage: string;
  entryFee: { solo: number; duo: number; squad: number };
  prizePool: { solo: number; duo: number; squad: number };
  date: string;
  time: string;
  registrationStart: string;
  registrationEnd: string;
  tournamentStart: string;
  tournamentEnd: string;
  maxSlots: number;
  currentSlots: number;
  registrationOpen: boolean;
  comingSoon: boolean;
  rules: string[];
}

export const tournaments: Tournament[] = [
  {
    id: "ff-clash-01",
    gameName: "Free Fire",
    gameImage: gameFreeFire,
    entryFee: { solo: 30, duo: 50, squad: 100 },
    prizePool: { solo: 500, duo: 1000, squad: 3000 },
    date: "2026-04-10",
    time: "8:00 PM IST",
    registrationStart: "2026-03-25",
    registrationEnd: "2026-04-09",
    tournamentStart: "2026-04-10",
    tournamentEnd: "2026-04-10",
    maxSlots: 100,
    currentSlots: 47,
    registrationOpen: true,
    comingSoon: false,
    rules: [
      "No emulators allowed",
      "Players must join 15 minutes before match",
      "Teaming up with opponents is strictly prohibited",
      "Admin decisions are final",
    ],
  },
  {
    id: "bgmi-arena-01",
    gameName: "BGMI",
    gameImage: gameBgmi,
    entryFee: { solo: 50, duo: 80, squad: 150 },
    prizePool: { solo: 1000, duo: 2000, squad: 5000 },
    date: "2026-04-15",
    time: "9:00 PM IST",
    registrationStart: "2026-03-25",
    registrationEnd: "2026-04-14",
    tournamentStart: "2026-04-15",
    tournamentEnd: "2026-04-15",
    maxSlots: 100,
    currentSlots: 23,
    registrationOpen: true,
    comingSoon: false,
    rules: [
      "Device: Mobile only",
      "No hacks, mods, or cheating tools",
      "Players must use their registered in-game ID",
      "Admin decisions are final",
    ],
  },
  {
    id: "coming-soon-1",
    gameName: "Coming Soon",
    gameImage: "",
    entryFee: { solo: 0, duo: 0, squad: 0 },
    prizePool: { solo: 0, duo: 0, squad: 0 },
    date: "TBD",
    time: "TBD",
    registrationStart: "",
    registrationEnd: "",
    tournamentStart: "",
    tournamentEnd: "",
    maxSlots: 0,
    currentSlots: 0,
    registrationOpen: false,
    comingSoon: true,
    rules: [],
  },
  {
    id: "coming-soon-2",
    gameName: "Coming Soon",
    gameImage: "",
    entryFee: { solo: 0, duo: 0, squad: 0 },
    prizePool: { solo: 0, duo: 0, squad: 0 },
    date: "TBD",
    time: "TBD",
    registrationStart: "",
    registrationEnd: "",
    tournamentStart: "",
    tournamentEnd: "",
    maxSlots: 0,
    currentSlots: 0,
    registrationOpen: false,
    comingSoon: true,
    rules: [],
  },
  {
    id: "coming-soon-3",
    gameName: "Coming Soon",
    gameImage: "",
    entryFee: { solo: 0, duo: 0, squad: 0 },
    prizePool: { solo: 0, duo: 0, squad: 0 },
    date: "TBD",
    time: "TBD",
    registrationStart: "",
    registrationEnd: "",
    tournamentStart: "",
    tournamentEnd: "",
    maxSlots: 0,
    currentSlots: 0,
    registrationOpen: false,
    comingSoon: true,
    rules: [],
  },
];

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  matches: number;
  wins: number;
  losses: number;
  kills: number;
  points: number;
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, teamName: "Phoenix Esports", matches: 12, wins: 9, losses: 3, kills: 87, points: 245 },
  { rank: 2, teamName: "Shadow Wolves", matches: 12, wins: 8, losses: 4, kills: 76, points: 220 },
  { rank: 3, teamName: "Thunder Strike", matches: 12, wins: 7, losses: 5, kills: 69, points: 198 },
  { rank: 4, teamName: "Venom Squad", matches: 12, wins: 7, losses: 5, kills: 62, points: 185 },
  { rank: 5, teamName: "Dark Knights", matches: 12, wins: 6, losses: 6, kills: 58, points: 170 },
  { rank: 6, teamName: "Iron Claws", matches: 12, wins: 5, losses: 7, kills: 51, points: 148 },
  { rank: 7, teamName: "Blaze Warriors", matches: 12, wins: 5, losses: 7, kills: 45, points: 135 },
  { rank: 8, teamName: "Riot Gaming", matches: 12, wins: 4, losses: 8, kills: 40, points: 118 },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "update" | "result" | "announcement";
}

export const blogPosts: BlogPost[] = [
  { id: "1", title: "Free Fire Season 3 Results", excerpt: "Phoenix Esports dominates the finals with a stunning 15-kill victory chicken dinner.", date: "2026-03-20", category: "result" },
  { id: "2", title: "BGMI Tournament Registration Open", excerpt: "The biggest BGMI tournament of the year is now accepting registrations. Don't miss out!", date: "2026-03-22", category: "announcement" },
  { id: "3", title: "New Anti-Cheat Measures", excerpt: "We've implemented stricter anti-cheat detection to ensure fair gameplay for all participants.", date: "2026-03-23", category: "update" },
  { id: "4", title: "Prize Pool Increased!", excerpt: "Due to overwhelming response, we've doubled the prize pool for upcoming tournaments.", date: "2026-03-24", category: "announcement" },
];
