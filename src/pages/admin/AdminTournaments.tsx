import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { tournaments as demoTournaments } from "@/data/tournaments";

// NOTE: This uses demo data. Once Firebase is configured, replace with:
// import { getTournaments, addTournament, updateTournament, deleteTournament } from "@/lib/firestore";

const AdminTournaments = () => {
  const [items, setItems] = useState(demoTournaments.filter((t) => !t.comingSoon));
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    gameName: "",
    date: "",
    time: "",
    entrySolo: 0,
    entryDuo: 0,
    entrySquad: 0,
    prizeSolo: 0,
    prizeDuo: 0,
    prizeSquad: 0,
    maxSlots: 100,
    registrationOpen: true,
    rules: "",
  });

  const resetForm = () => {
    setForm({ gameName: "", date: "", time: "", entrySolo: 0, entryDuo: 0, entrySquad: 0, prizeSolo: 0, prizeDuo: 0, prizeSquad: 0, maxSlots: 100, registrationOpen: true, rules: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.gameName || !form.date) {
      toast.error("Game name and date are required");
      return;
    }
    // TODO: Replace with Firestore addTournament / updateTournament
    toast.success(editing ? "Tournament updated" : "Tournament added");
    resetForm();
  };

  const handleDelete = (id: string) => {
    // TODO: Replace with Firestore deleteTournament(id)
    setItems(items.filter((i) => i.id !== id));
    toast.success("Tournament deleted");
  };

  const handleEdit = (t: typeof items[0]) => {
    setForm({
      gameName: t.gameName,
      date: t.date,
      time: t.time,
      entrySolo: t.entryFee.solo,
      entryDuo: t.entryFee.duo,
      entrySquad: t.entryFee.squad,
      prizeSolo: t.prizePool.solo,
      prizeDuo: t.prizePool.duo,
      prizeSquad: t.prizePool.squad,
      maxSlots: t.maxSlots,
      registrationOpen: t.registrationOpen,
      rules: t.rules.join("\n"),
    });
    setEditing(t.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold uppercase">Tournaments</h1>
        <Button variant="destructive" size="sm" onClick={() => { resetForm(); setShowForm(true); }} className="font-display uppercase text-xs">
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {showForm && (
        <div className="gradient-card border-glow rounded-lg p-6 mb-6 space-y-4">
          <h2 className="font-display text-sm uppercase text-muted-foreground">{editing ? "Edit" : "New"} Tournament</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground font-display">Game Name</Label>
              <Input value={form.gameName} onChange={(e) => setForm({ ...form, gameName: e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Time</Label>
              <Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="8:00 PM IST" className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Max Slots</Label>
              <Input type="number" value={form.maxSlots} onChange={(e) => setForm({ ...form, maxSlots: +e.target.value })} className="bg-input border-border" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground font-display">Solo Fee ₹</Label>
              <Input type="number" value={form.entrySolo} onChange={(e) => setForm({ ...form, entrySolo: +e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Duo Fee ₹</Label>
              <Input type="number" value={form.entryDuo} onChange={(e) => setForm({ ...form, entryDuo: +e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Squad Fee ₹</Label>
              <Input type="number" value={form.entrySquad} onChange={(e) => setForm({ ...form, entrySquad: +e.target.value })} className="bg-input border-border" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground font-display">Solo Prize ₹</Label>
              <Input type="number" value={form.prizeSolo} onChange={(e) => setForm({ ...form, prizeSolo: +e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Duo Prize ₹</Label>
              <Input type="number" value={form.prizeDuo} onChange={(e) => setForm({ ...form, prizeDuo: +e.target.value })} className="bg-input border-border" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-display">Squad Prize ₹</Label>
              <Input type="number" value={form.prizeSquad} onChange={(e) => setForm({ ...form, prizeSquad: +e.target.value })} className="bg-input border-border" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-display">Rules (one per line)</Label>
            <Textarea value={form.rules} onChange={(e) => setForm({ ...form, rules: e.target.value })} rows={3} className="bg-input border-border" />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.registrationOpen} onCheckedChange={(v) => setForm({ ...form, registrationOpen: v })} />
            <span className="text-sm font-body">Registration {form.registrationOpen ? "Open" : "Closed"}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleSave} className="font-display uppercase text-xs">Save</Button>
            <Button variant="ghost" onClick={resetForm} className="text-muted-foreground text-xs">Cancel</Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="gradient-card border-glow rounded-lg p-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold">{t.gameName}</h3>
              <p className="text-xs text-muted-foreground font-body">
                {t.date} • Slots: {t.currentSlots}/{t.maxSlots} • {t.registrationOpen ? "Open" : "Closed"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(t)} className="text-muted-foreground hover:text-primary">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTournaments;
