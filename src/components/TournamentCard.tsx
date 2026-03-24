import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Trophy, Coins, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tournament } from "@/data/tournaments";
import bannerCS from "@/assets/banner-coming-soon.jpg";

interface Props {
  tournament: Tournament;
  index: number;
}

const TournamentCard = ({ tournament: t, index }: Props) => {
  const isClosed = t.currentSlots >= t.maxSlots || !t.registrationOpen;

  if (t.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileTap={{ scale: 0.97 }}
        className="gradient-card border-glow rounded-lg overflow-hidden opacity-60 cursor-not-allowed"
      >
        <img src={bannerCS} alt="Coming Soon" className="w-full h-40 object-cover" loading="lazy" />
        <div className="p-5 text-center">
          <h3 className="font-display text-lg text-muted-foreground uppercase">Coming Soon</h3>
          <p className="text-sm text-muted-foreground/60 mt-2 font-body">Stay tuned for more tournaments</p>
          <Button disabled variant="outline" className="mt-4 w-full border-border text-muted-foreground">
            <Lock className="mr-2 h-4 w-4" /> Coming Soon
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="gradient-card border-glow rounded-lg overflow-hidden hover:box-glow transition-shadow duration-300"
    >
      <img src={t.gameImage} alt={t.gameName} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-5 space-y-3">
        <h3 className="font-display text-xl font-bold uppercase">{t.gameName}</h3>

        <div className="grid grid-cols-2 gap-2 text-sm font-body">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coins className="h-4 w-4 text-primary" />
            <span>Entry: ₹{t.entryFee.squad}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-4 w-4 text-primary" />
            <span>Prize: ₹{t.prizePool.squad}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{t.date} • {t.time}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground/70 font-body">
          Slots: {t.currentSlots}/{t.maxSlots}
        </div>

        {isClosed ? (
          <Button disabled variant="outline" className="w-full border-border text-muted-foreground">
            Registration Closed
          </Button>
        ) : (
          <Link to={`/tournament/${t.id}`}>
            <Button variant="destructive" className="w-full font-display uppercase tracking-wider box-glow hover:box-glow-strong transition-shadow">
              Register Now
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default TournamentCard;
