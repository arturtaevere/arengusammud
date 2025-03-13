
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
import { AuthProvider } from "./context/AuthContext";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/competences" element={<Competences />} />
            <Route path="/action-steps" element={<ActionSteps />} />
            <Route path="/action-steps/:stepId" element={<ActionStepDetail />} />
            <Route path="/observations" element={<Dashboard />} /> {/* Temporarily redirecting to Dashboard */}
            <Route path="/observations/:id" element={<Dashboard />} /> {/* Temporarily redirecting to Dashboard */}
            <Route path="/observations/new" element={<Dashboard />} /> {/* Temporarily redirecting to Dashboard */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
