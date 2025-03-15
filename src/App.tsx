
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Competences from "./pages/Competences";
import ActionSteps from "./pages/ActionSteps";
import ActionStepDetail from "./pages/ActionStepDetail";
import Profile from "./pages/Profile";
import Observations from "./pages/Observations";
import Admin from "./pages/Admin";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider } from "./context/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/competences" element={<Competences />} />
            <Route path="/action-steps" element={<ActionSteps />} />
            <Route path="/action-steps/:stepId" element={<ActionStepDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/study-circles" element={<Dashboard />} /> {/* Placeholder - will need a dedicated page */}
            <Route path="/observations" element={<Observations />} />
            <Route path="/observations/:id" element={<Dashboard />} /> {/* Will implement later */}
            <Route path="/observations/new" element={<Observations />} />
            <Route path="/feedback/new" element={<Observations />} />
            <Route path="/feedback/:id" element={<Dashboard />} /> {/* Will implement later */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
