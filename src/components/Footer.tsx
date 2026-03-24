import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-deep-bg py-12 border-t border-border/30">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold text-primary uppercase mb-3">The Tournament</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            The ultimate esports tournament platform for Free Fire, BGMI, and more. Compete, win, and dominate.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase mb-3 text-foreground/80">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "Tournaments", "Leaderboard", "Blog"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase mb-3 text-foreground/80">Contact</h4>
          <a
            href="https://wa.me/919279890625"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-md hover:bg-primary/20 transition-colors font-body font-semibold text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border/20 text-center text-xs text-muted-foreground/60 font-body">
        © 2026 The Tournament. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
