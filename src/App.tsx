import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import TournamentPage from "./pages/TournamentPage";
import TournamentsListPage from "./pages/TournamentsListPage";
import RegistrationPage from "./pages/RegistrationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTournaments from "./pages/admin/AdminTournaments";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminLeaderboard from "./pages/admin/AdminLeaderboard";
import AdminBlog from "./pages/admin/AdminBlog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const FloatingButton = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const container = document.getElementById("floating-container");
      if (!e.target.closest("#floating-container")) {
        container.classList.remove("active");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div id="floating-container">
      <div id="madeby-panel">Made by Saksham Kashyap</div>

      <button
        id="floating-btn"
        onClick={() => window.open("https://wa.me/919279890625", "_blank")}
      >
        💬
      </button>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tournaments" element={<TournamentsListPage />} />
            <Route path="/tournament/:id" element={<TournamentPage />} />
            <Route path="/register/:id" element={<RegistrationPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="tournaments" element={<AdminTournaments />} />
              <Route path="registrations" element={<AdminRegistrations />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="leaderboard" element={<AdminLeaderboard />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Floating Button */}
          <FloatingButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
