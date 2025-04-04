
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Competences from "./pages/Competences";
import CompetencyDetail from "./pages/CompetencyDetail";
import ActionSteps from "./pages/ActionSteps";
import ActionStepDetail from "./pages/ActionStepDetail";
import Profile from "./pages/Profile";
import Observations from "./pages/Observations";
import VerifyEmail from "./pages/VerifyEmail";
import StudyCircles from "./pages/StudyCircles";
import StudyCircleSession from "./pages/StudyCircleSession";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/auth";
import ObservationDetail from './pages/ObservationDetail';
import Reflections from './pages/Reflections';
import ReflectionDetail from './pages/ReflectionDetail';
import ReflectionForm from './components/reflection/ReflectionForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/competences" element={<Competences />} />
          <Route path="/competency/:id" element={<CompetencyDetail />} />
          <Route path="/action-steps" element={<ActionSteps />} />
          <Route path="/action-steps/:stepId" element={<ActionStepDetail />} />
          {/* Add new route for singular form */}
          <Route path="/action-step/:stepId" element={<ActionStepDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/study-circles" element={<StudyCircles />} />
          <Route path="/study-circles/session/:sessionId" element={<StudyCircleSession />} />
          <Route path="/observations" element={<Observations />} />
          <Route path="/observations/:id" element={<ObservationDetail />} />
          <Route path="/observations/new" element={<Observations />} />
          <Route path="/feedback/new" element={<Observations />} />
          <Route path="/feedback/:id" element={<Dashboard />} />
          {/* Add new routes for reflections */}
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/reflections/:id" element={<ReflectionDetail />} />
          <Route path="/reflections/new" element={<ReflectionForm />} />
          <Route path="/reflections/edit/:id" element={<ReflectionForm isEditing />} />
          <Route path="/admin" element={<Admin />} /> {/* Add the Admin route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
