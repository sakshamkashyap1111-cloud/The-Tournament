import { Trophy, Users, Ticket, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  { label: "Tournaments", icon: Trophy, path: "/admin/tournaments", desc: "Manage games & slots" },
  { label: "Registrations", icon: Users, path: "/admin/registrations", desc: "View player entries" },
  { label: "Coupons", icon: Ticket, path: "/admin/coupons", desc: "Discount codes" },
  { label: "Blog", icon: FileText, path: "/admin/blog", desc: "Post updates" },
];

const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-display font-bold uppercase mb-6">
      Dashboard
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((c) => (
        <Link
          key={c.path}
          to={c.path}
          className="gradient-card border-glow rounded-lg p-6 hover:box-glow transition-shadow duration-300 group"
        >
          <c.icon className="h-8 w-8 text-primary mb-3" />
          <h2 className="font-display text-lg font-bold group-hover:text-primary transition-colors">{c.label}</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">{c.desc}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
