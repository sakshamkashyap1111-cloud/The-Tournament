import { motion } from "framer-motion";
import { Users, Swords, Trophy } from "lucide-react";

const stats = [
  { icon: Users, label: "Total Players", value: "2,500+" },
  { icon: Swords, label: "Active Matches", value: "12" },
  { icon: Trophy, label: "Total Prize Pool", value: "₹50,000+" },
];

const StatsSection = () => (
  <section className="py-16 bg-deep-bg/30">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center space-y-2"
          >
            <s.icon className="h-8 w-8 text-primary mx-auto" />
            <div className="text-3xl md:text-4xl font-display font-black text-primary text-glow">
              {s.value}
            </div>
            <div className="text-sm text-text-secondary uppercase tracking-wider font-body font-semibold">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
