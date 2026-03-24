import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="gradient-hero py-20 md:py-32 relative overflow-hidden">
    {/* Subtle glow orb */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

    <div className="container relative z-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-tight"
      >
        Enter The Ultimate
        <br />
        <span className="text-primary text-glow">Gaming Arena</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 text-lg md:text-xl text-muted-foreground font-body font-medium"
      >
        Compete. Win. Dominate.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8"
      >
        <Link to="/tournaments">
          <Button variant="destructive" size="lg" className="text-lg px-10 py-6 font-display uppercase tracking-wider box-glow hover:box-glow-strong transition-shadow duration-300">
            Join Tournament
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
