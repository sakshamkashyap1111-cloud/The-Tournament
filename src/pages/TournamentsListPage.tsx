import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TournamentCard from "@/components/TournamentCard";
import { tournaments } from "@/data/tournaments";

const TournamentsListPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-display font-black uppercase text-center mb-10">
          All <span className="text-primary text-glow">Tournaments</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((t, i) => (
            <TournamentCard key={t.id} tournament={t} index={i} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default TournamentsListPage;
