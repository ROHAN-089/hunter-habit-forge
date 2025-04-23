import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Quests from "./pages/Quests";
import DailyLog from "./pages/DailyLog";
import { AppProvider, useApp } from "./context/AppContext";

const queryClient = new QueryClient();

// Route guard for authenticated routes
const RequireSetup = ({ children }: { children: React.ReactNode }) => {
  const { isSetupComplete } = useApp();
  return isSetupComplete ? <>{children}</> : <Navigate to="/setup" />;
};

// Route guard to prevent access to setup after completed
const PreventSetupAccess = ({ children }: { children: React.ReactNode }) => {
  const { isSetupComplete } = useApp();
  return !isSetupComplete ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/setup" element={
        <PreventSetupAccess>
          <ProfileSetup />
        </PreventSetupAccess>
      } />
      
      <Route path="/" element={
        <RequireSetup>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </RequireSetup>
      } />
      
      <Route path="/profile" element={
        <RequireSetup>
          <MainLayout>
            <Profile />
          </MainLayout>
        </RequireSetup>
      } />
      
      <Route path="/quests" element={
        <RequireSetup>
          <MainLayout>
            <Quests />
          </MainLayout>
        </RequireSetup>
      } />
      
      <Route path="/daily-log" element={
        <RequireSetup>
          <MainLayout>
            <DailyLog />
          </MainLayout>
        </RequireSetup>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
