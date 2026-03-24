import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  active: boolean;
}

const demoCoupons: Coupon[] = [
  { id: "1", code: "ARENA50", discount: 50, active: true },
  { id: "2", code: "ARENA20", discount: 20, active: true },
];

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(demoCoupons);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(0);

  const addNew = () => {
    if (!newCode.trim() || newDiscount <= 0) {
      toast.error("Enter valid code and discount");
      return;
    }
    // TODO: Replace with addCoupon from firestore.ts
    setCoupons([...coupons, { id: Date.now().toString(), code: newCode.toUpperCase(), discount: newDiscount, active: true }]);
    setNewCode("");
    setNewDiscount(0);
    toast.success("Coupon added");
  };

  const toggleActive = (id: string) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
    toast.success("Coupon updated");
  };

  const remove = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast.success("Coupon deleted");
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold uppercase mb-6">Coupons</h1>

      <div className="gradient-card border-glow rounded-lg p-5 mb-6">
        <h2 className="text-sm font-display uppercase text-muted-foreground mb-3">Add Coupon</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground font-display">Code</Label>
            <Input value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="COUPONCODE" className="bg-input border-border" />
          </div>
          <div className="w-32">
            <Label className="text-xs text-muted-foreground font-display">Discount ₹</Label>
            <Input type="number" value={newDiscount} onChange={(e) => setNewDiscount(+e.target.value)} className="bg-input border-border" />
          </div>
          <div className="flex items-end">
            <Button variant="destructive" onClick={addNew} className="font-display uppercase text-xs">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {coupons.map((c) => (
          <div key={c.id} className="gradient-card border-glow rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="font-display font-bold text-primary">{c.code}</span>
              <span className="text-sm text-muted-foreground font-body ml-3">₹{c.discount} off</span>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={c.active} onCheckedChange={() => toggleActive(c.id)} />
              <Button variant="ghost" size="icon" onClick={() => remove(c.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoupons;
