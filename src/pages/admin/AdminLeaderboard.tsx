import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { leaderboardData, type LeaderboardEntry } from "@/data/tournaments";

const AdminLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(leaderboardData);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ teamName: "", matches: 0, wins: 0, losses: 0, kills: 0, points: 0 });

  const startEdit = (idx: number) => {
    const e = entries[idx];
    setForm({ teamName: e.teamName, matches: e.matches, wins: e.wins, losses: e.losses, kills: e.kills, points: e.points });
    setEditingIdx(idx);
  };

  const saveEdit = () => {
    if (editingIdx === null) return;
    const updated = [...entries];
    updated[editingIdx] = { ...updated[editingIdx], ...form };
    // Re-sort by points
    updated.sort((a, b) => b.points - a.points);
    updated.forEach((e, i) => (e.rank = i + 1));
    setEntries(updated);
    setEditingIdx(null);
    toast.success("Entry updated");
  };

  const addEntry = () => {
    const newEntry: LeaderboardEntry = {
      rank: entries.length + 1,
      teamName: "New Team",
      matches: 0, wins: 0, losses: 0, kills: 0, points: 0,
    };
    setEntries([...entries, newEntry]);
    startEdit(entries.length);
  };

  const deleteEntry = (idx: number) => {
    const updated = entries.filter((_, i) => i !== idx);
    updated.forEach((e, i) => (e.rank = i + 1));
    setEntries(updated);
    toast.success("Entry removed");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold uppercase">Leaderboard</h1>
        <Button variant="destructive" size="sm" onClick={addEntry} className="font-display uppercase text-xs">
          <Plus className="h-4 w-4 mr-1" /> Add Team
        </Button>
      </div>

      <div className="gradient-card border-glow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase text-xs tracking-wider">
                <th className="py-3 px-3 text-left">#</th>
                <th className="py-3 px-3 text-left">Team</th>
                <th className="py-3 px-3 text-center">M</th>
                <th className="py-3 px-3 text-center">W</th>
                <th className="py-3 px-3 text-center">L</th>
                <th className="py-3 px-3 text-center">K</th>
                <th className="py-3 px-3 text-center">Pts</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, idx) => (
                <tr key={idx} className="border-b border-border/30 hover:bg-primary/5">
                  <td className="py-2 px-3 font-display font-bold">{e.rank}</td>
                  <td className="py-2 px-3">
                    {editingIdx === idx ? (
                      <Input value={form.teamName} onChange={(ev) => setForm({ ...form, teamName: ev.target.value })} className="bg-input border-border h-8 text-xs" />
                    ) : (
                      <span className="font-semibold">{e.teamName}</span>
                    )}
                  </td>
                  {editingIdx === idx ? (
                    <>
                      <td className="py-2 px-1"><Input type="number" value={form.matches} onChange={(ev) => setForm({ ...form, matches: +ev.target.value })} className="bg-input border-border h-8 text-xs w-14 text-center" /></td>
                      <td className="py-2 px-1"><Input type="number" value={form.wins} onChange={(ev) => setForm({ ...form, wins: +ev.target.value })} className="bg-input border-border h-8 text-xs w-14 text-center" /></td>
                      <td className="py-2 px-1"><Input type="number" value={form.losses} onChange={(ev) => setForm({ ...form, losses: +ev.target.value })} className="bg-input border-border h-8 text-xs w-14 text-center" /></td>
                      <td className="py-2 px-1"><Input type="number" value={form.kills} onChange={(ev) => setForm({ ...form, kills: +ev.target.value })} className="bg-input border-border h-8 text-xs w-14 text-center" /></td>
                      <td className="py-2 px-1"><Input type="number" value={form.points} onChange={(ev) => setForm({ ...form, points: +ev.target.value })} className="bg-input border-border h-8 text-xs w-14 text-center" /></td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-3 text-center">{e.matches}</td>
                      <td className="py-2 px-3 text-center">{e.wins}</td>
                      <td className="py-2 px-3 text-center">{e.losses}</td>
                      <td className="py-2 px-3 text-center">{e.kills}</td>
                      <td className="py-2 px-3 text-center font-display font-bold">{e.points}</td>
                    </>
                  )}
                  <td className="py-2 px-3 text-center">
                    <div className="flex gap-1 justify-center">
                      {editingIdx === idx ? (
                        <Button variant="ghost" size="icon" onClick={saveEdit} className="h-7 w-7 text-primary">
                          <Save className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => startEdit(idx)} className="h-7 w-7 text-muted-foreground hover:text-primary">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteEntry(idx)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
