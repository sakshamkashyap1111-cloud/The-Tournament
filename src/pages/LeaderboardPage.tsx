import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { leaderboardData } from "@/data/tournaments";

const LeaderboardPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-display font-black uppercase text-center">
          Full <span className="text-primary text-glow">Leaderboard</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 gradient-card border-glow rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                  <th className="py-4 px-4 text-left">Rank</th>
                  <th className="py-4 px-4 text-left">Team</th>
                  <th className="py-4 px-4 text-center">Matches</th>
                  <th className="py-4 px-4 text-center">Wins</th>
                  <th className="py-4 px-4 text-center">Losses</th>
                  <th className="py-4 px-4 text-center">Kills</th>
                  <th className="py-4 px-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((t) => (
                  <tr
                    key={t.rank}
                    className={`border-b border-border/30 transition-colors hover:bg-primary/5 ${
                      t.rank <= 3 ? "text-primary font-semibold" : "text-foreground/80"
                    }`}
                  >
                    <td className="py-4 px-4 font-display font-bold">{t.rank}</td>
                    <td className="py-4 px-4 font-semibold">{t.teamName}</td>
                    <td className="py-4 px-4 text-center">{t.matches}</td>
                    <td className="py-4 px-4 text-center">{t.wins}</td>
                    <td className="py-4 px-4 text-center">{t.losses}</td>
                    <td className="py-4 px-4 text-center">{t.kills}</td>
                    <td className="py-4 px-4 text-center font-display font-bold">{t.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default LeaderboardPage;
