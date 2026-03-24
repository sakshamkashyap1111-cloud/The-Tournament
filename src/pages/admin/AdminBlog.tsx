import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { blogPosts as demoPosts, type BlogPost } from "@/data/tournaments";

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(demoPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", category: "announcement" as BlogPost["category"] });

  const addPost = () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    // TODO: Replace with addBlogPost from firestore.ts
    setPosts([
      { id: Date.now().toString(), ...form, date: new Date().toISOString().split("T")[0] },
      ...posts,
    ]);
    setForm({ title: "", excerpt: "", category: "announcement" });
    setShowForm(false);
    toast.success("Post added");
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    toast.success("Post deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold uppercase">Blog</h1>
        <Button variant="destructive" size="sm" onClick={() => setShowForm(!showForm)} className="font-display uppercase text-xs">
          <Plus className="h-4 w-4 mr-1" /> New Post
        </Button>
      </div>

      {showForm && (
        <div className="gradient-card border-glow rounded-lg p-5 mb-6 space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground font-display">Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-input border-border" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground font-display">Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="bg-input border-border" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground font-display">Category</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as BlogPost["category"] })}
              className="w-full mt-1 bg-input border border-border rounded-md px-3 py-2 text-sm text-foreground font-body"
            >
              <option value="announcement">Announcement</option>
              <option value="result">Result</option>
              <option value="update">Update</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={addPost} className="font-display uppercase text-xs">Publish</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} className="text-muted-foreground text-xs">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="gradient-card border-glow rounded-lg p-4 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-display uppercase">{p.category}</span>
                <span className="text-xs text-muted-foreground font-body">{p.date}</span>
              </div>
              <h3 className="font-display font-bold text-sm">{p.title}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1">{p.excerpt}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deletePost(p.id)} className="text-muted-foreground hover:text-destructive shrink-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
