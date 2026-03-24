import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Trophy, Coins, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tournaments } from "@/data/tournaments";

type MatchType = "solo" | "duo" | "squad";

const TournamentPage = () => {
  const { id } = useParams();
  const tournament = tournaments.find((t) => t.id === id);
  const [matchType, setMatchType] = useState<MatchType>("squad");

  if (!tournament || tournament.comingSoon) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center container">
          <h1 className="text-3xl font-display font-bold text-primary">Tournament Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isClosed = tournament.currentSlots >= tournament.maxSlots || !tournament.registrationOpen;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img
              src={tournament.gameImage}
              alt={tournament.gameName}
              className="w-full h-56 md:h-72 object-cover rounded-lg border-glow"
            />
            <h1 className="mt-6 text-3xl md:text-4xl font-display font-black uppercase">
              {tournament.gameName} <span className="text-primary text-glow">Tournament</span>
            </h1>
          </motion.div>

          {/* Match Type */}
          <div className="mt-8">
            <h3 className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-3">Match Type</h3>
            <div className="flex gap-3">
              {(["solo", "duo", "squad"] as MatchType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setMatchType(type)}
                  className={`px-6 py-2.5 rounded-md font-display text-sm uppercase tracking-wider transition-all duration-300 ${
                    matchType === type
                      ? "bg-primary text-primary-foreground box-glow"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <motion.div
            key={matchType}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-8 gradient-card border-glow rounded-lg p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4 text-sm font-body">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Entry Fee:</span>
                <span className="font-bold">₹{tournament.entryFee[matchType]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Prize Pool:</span>
                <span className="font-bold">₹{tournament.prizePool[matchType]}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Date:</span>
                <span className="font-bold">{tournament.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Time:</span>
                <span className="font-bold">{tournament.time}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Slots:</span>
                <span className="font-bold">{tournament.currentSlots}/{tournament.maxSlots}</span>
              </div>
            </div>
          </motion.div>

          {/* Rules */}
          <div className="mt-8">
            <h3 className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-3">Rules</h3>
            <ul className="space-y-2">
              {tournament.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-body">
                  <span className="text-primary mt-0.5">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10">
            {isClosed ? (
              <Button disabled variant="outline" size="lg" className="w-full text-muted-foreground border-border">
                Registration Closed
              </Button>
            ) : (
              <Link to={`/register/${tournament.id}?type=${matchType}`}>
                <Button variant="destructive" size="lg" className="w-full text-lg font-display uppercase tracking-wider box-glow hover:box-glow-strong transition-shadow py-6">
                  Join Now — ₹{tournament.entryFee[matchType]}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TournamentPage;
