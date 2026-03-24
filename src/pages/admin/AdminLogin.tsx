import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigate("/admin");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-card border-glow rounded-lg p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-display font-bold uppercase">Admin Login</h1>
          <p className="text-xs text-muted-foreground font-body mt-1">Arena Esports Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Email</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-input border-border focus:border-primary focus:ring-primary"
              placeholder="admin@arena.com"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-display">Password</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-input border-border focus:border-primary focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            variant="destructive"
            disabled={loading}
            className="w-full font-display uppercase tracking-wider box-glow"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
