import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tournaments } from "@/data/tournaments";
import { toast } from "sonner";

type MatchType = "solo" | "duo" | "squad";

const playerCount: Record<MatchType, number> = { solo: 1, duo: 2, squad: 4 };

const RegistrationPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const matchType = (searchParams.get("type") || "squad") as MatchType;
  const tournament = tournaments.find((t) => t.id === id);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!tournament || tournament.comingSoon) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center container">
          <h1 className="text-3xl font-display font-bold text-primary">Tournament Not Found</h1>
        </div>
      </div>
    );
  }

  const baseFee = tournament.entryFee[matchType];
  const finalFee = Math.max(0, baseFee - discount);
  const count = playerCount[matchType];

  const applyCoupon = () => {
    setCouponError("");
    if (!coupon.trim()) {
      setDiscount(0);
      return;
    }
    // Demo coupon validation
    if (coupon.toUpperCase() === "ARENA50") {
      setDiscount(50);
      toast.success("Coupon applied! ₹50 off");
    } else if (coupon.toUpperCase() === "ARENA20") {
      setDiscount(20);
      toast.success("Coupon applied! ₹20 off");
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
      toast.error("Invalid coupon code");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate payment flow
    setTimeout(() => {
      toast.success("Registration successful!");
      navigate(`/confirmation?game=${tournament.gameName}&type=${matchType}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-display font-bold uppercase text-center">
              Register — <span className="text-primary text-glow">{tournament.gameName}</span>
            </h1>
            <p className="text-center text-muted-foreground font-body mt-2 capitalize">
              {matchType} • Entry: ₹{finalFee}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Common Fields */}
              <div className="space-y-3">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Full Name</Label>
                  <Input required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" placeholder="Your full name" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Leader Name</Label>
                  <Input required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" placeholder="Team leader name" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Team Name</Label>
                  <Input required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" placeholder="Unique team name" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">WhatsApp Number</Label>
                  <Input required type="tel" className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" placeholder="+91 XXXXXXXXXX" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Email</Label>
                  <Input required type="email" className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" placeholder="your@email.com" />
                </div>
              </div>

              {/* Player Fields */}
              <div className="space-y-4">
                <h3 className="text-sm font-display uppercase tracking-wider text-muted-foreground">Player Details</h3>
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="gradient-card border-glow rounded-lg p-4 space-y-2">
                    <p className="text-xs font-display text-primary uppercase">Player {i + 1}</p>
                    <Input required placeholder="In-game Name" className="bg-input border-border focus:border-primary focus:ring-primary" />
                    <Input required placeholder="In-game UID" className="bg-input border-border focus:border-primary focus:ring-primary" />
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Coupon Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                  />
                  <Button type="button" variant="outline" onClick={applyCoupon} className="border-primary/50 text-primary hover:bg-primary/10 shrink-0">
                    Apply
                  </Button>
                </div>
                {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                {discount > 0 && <p className="text-xs text-primary">Discount: ₹{discount} off</p>}
              </div>

              {/* Summary */}
              <div className="gradient-card border-glow rounded-lg p-4">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Entry Fee</span>
                  <span>₹{baseFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body text-sm text-primary">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-display font-bold text-lg mt-2 pt-2 border-t border-border/30">
                  <span>Total</span>
                  <span className="text-primary">₹{finalFee}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="destructive"
                size="lg"
                disabled={submitting}
                className="w-full text-lg font-display uppercase tracking-wider box-glow hover:box-glow-strong transition-shadow py-6"
              >
                {submitting ? "Processing..." : `Pay ₹${finalFee} & Register`}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
