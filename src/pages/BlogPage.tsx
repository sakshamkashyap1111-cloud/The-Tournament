import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/tournaments";

const categoryColors: Record<string, string> = {
  update: "bg-accent text-accent-foreground",
  result: "bg-primary/20 text-primary",
  announcement: "bg-secondary/20 text-secondary",
};

const BlogPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-display font-black uppercase text-center mb-10">
          News & <span className="text-primary text-glow">Updates</span>
        </h1>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card border-glow rounded-lg p-6 hover:box-glow transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs px-2 py-1 rounded font-display uppercase ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground font-body">{post.date}</span>
              </div>
              <h2 className="text-lg font-display font-bold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default BlogPage;
