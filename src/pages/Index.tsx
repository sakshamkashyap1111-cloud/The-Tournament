import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BannerSlider from "@/components/BannerSlider";
import TournamentCard from "@/components/TournamentCard";
import StatsSection from "@/components/StatsSection";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import Footer from "@/components/Footer";
import { tournaments } from "@/data/tournaments";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-16">
      <HeroSection />

      {/* Banner Slider */}
      <section className="py-12">
        <div className="container">
          <BannerSlider />
        </div>
      </section>

      {/* Tournaments */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold uppercase text-center mb-8">
            Live <span className="text-primary text-glow">Tournaments</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t, i) => (
              <TournamentCard key={t.id} tournament={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <LeaderboardPreview />
      <Footer />
    </div>
  </div>
);

export default Index;
