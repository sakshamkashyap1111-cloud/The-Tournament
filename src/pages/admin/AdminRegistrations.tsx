const AdminRegistrations = () => {
  // TODO: Replace with getRegistrations() from firestore.ts
  const demoRegs = [
    { id: "1", teamName: "Phoenix Esports", game: "Free Fire", type: "squad", leader: "Ravi", email: "ravi@example.com", phone: "+91 9876543210", status: "confirmed", date: "2026-03-23" },
    { id: "2", teamName: "Shadow Wolves", game: "BGMI", type: "duo", leader: "Priya", email: "priya@example.com", phone: "+91 9876543211", status: "confirmed", date: "2026-03-24" },
    { id: "3", teamName: "Thunder Strike", game: "Free Fire", type: "solo", leader: "Arjun", email: "arjun@example.com", phone: "+91 9876543212", status: "confirmed", date: "2026-03-24" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold uppercase mb-6">Registrations</h1>

      <div className="gradient-card border-glow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-4 text-left">Game</th>
                <th className="py-3 px-4 text-center">Type</th>
                <th className="py-3 px-4 text-left">Leader</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {demoRegs.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-primary/5">
                  <td className="py-3 px-4 font-semibold">{r.teamName}</td>
                  <td className="py-3 px-4">{r.game}</td>
                  <td className="py-3 px-4 text-center capitalize">{r.type}</td>
                  <td className="py-3 px-4">{r.leader}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.email}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-display uppercase">{r.status}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/60 font-body mt-4">
        Connect Firebase to see live registration data from Firestore.
      </p>
    </div>
  );
};

export default AdminRegistrations;
