import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ConfirmationPage = () => {
  const [params] = useSearchParams();
  const game = params.get("game") || "Tournament";
  const type = params.get("type") || "squad";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-12">
        <div className="container max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <CheckCircle className="h-20 w-20 text-primary mx-auto box-glow rounded-full" />
            <h1 className="mt-6 text-3xl font-display font-black uppercase">
              Registration <span className="text-primary text-glow">Successful!</span>
            </h1>
            <p className="mt-3 text-muted-foreground font-body">
              You have been registered for the <strong className="text-foreground">{game}</strong> tournament ({type}).
            </p>

            <div className="mt-8 gradient-card border-glow rounded-lg p-6 text-left space-y-3 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Game</span>
                <span className="font-semibold">{game}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Match Type</span>
                <span className="font-semibold capitalize">{type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-primary font-bold">Confirmed</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="https://chat.whatsapp.com/example"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full border-primary/50 text-primary hover:bg-primary/10 font-display uppercase tracking-wider">
                  <MessageCircle className="mr-2 h-5 w-5" /> Join WhatsApp Group
                </Button>
              </a>
              <p className="text-xs text-muted-foreground/60">Join the group for match updates & timing</p>

              <Link to="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary mt-2">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
