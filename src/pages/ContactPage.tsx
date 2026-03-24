import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container max-w-lg">
          <h1 className="text-3xl font-display font-black uppercase text-center mb-8">
            Contact <span className="text-primary text-glow">Us</span>
          </h1>

          <div className="flex flex-col gap-4 mb-8">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="w-full border-primary/50 text-primary hover:bg-primary/10 font-display uppercase">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </Button>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="gradient-card border-glow rounded-lg p-6 space-y-4">
            <div>
              <Input required placeholder="Your Name" className="bg-input border-border focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <Input required type="email" placeholder="Your Email" className="bg-input border-border focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <Textarea required placeholder="Your Message" rows={4} className="bg-input border-border focus:border-primary focus:ring-primary" />
            </div>
            <Button type="submit" variant="destructive" className="w-full font-display uppercase tracking-wider box-glow hover:box-glow-strong">
              Send Message
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
