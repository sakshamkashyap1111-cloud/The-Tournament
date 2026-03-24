import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { leaderboardData } from "@/data/tournaments";
import { Button } from "@/components/ui/button";

const LeaderboardPreview = () => {
  const top5 = leaderboardData.slice(0, 5);

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-center mb-8">
          Point <span className="text-primary text-glow">Table</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-card border-glow rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Team</th>
                  <th className="py-3 px-4 text-center">M</th>
                  <th className="py-3 px-4 text-center">W</th>
                  <th className="py-3 px-4 text-center">K</th>
                  <th className="py-3 px-4 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {top5.map((t) => (
                  <tr
                    key={t.rank}
                    className={`border-b border-border/30 transition-colors hover:bg-primary/5 ${
                      t.rank <= 3 ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    <td className="py-3 px-4 font-display font-bold">{t.rank}</td>
                    <td className="py-3 px-4 font-semibold">{t.teamName}</td>
                    <td className="py-3 px-4 text-center">{t.matches}</td>
                    <td className="py-3 px-4 text-center">{t.wins}</td>
                    <td className="py-3 px-4 text-center">{t.kills}</td>
                    <td className="py-3 px-4 text-center font-display font-bold">{t.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <Link to="/leaderboard">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-display uppercase tracking-wider">
              View Full Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
