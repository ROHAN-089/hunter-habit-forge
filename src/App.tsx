
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Quests from "./pages/Quests";
import DailyLog from "./pages/DailyLog";
import ShadowArmy from "./pages/ShadowArmy";
import { AppProvider, useApp } from "./context/AppContext";
import Index from "./pages/Index";

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
      <Route path="/" element={<Index />} />
      
      <Route path="/setup" element={
        <PreventSetupAccess>
          <ProfileSetup />
        </PreventSetupAccess>
      } />
      
      <Route path="/dashboard" element={
        <RequireSetup>
          <SidebarProvider>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </SidebarProvider>
        </RequireSetup>
      } />
      
      <Route path="/profile" element={
        <RequireSetup>
          <SidebarProvider>
            <MainLayout>
              <Profile />
            </MainLayout>
          </SidebarProvider>
        </RequireSetup>
      } />
      
      <Route path="/quests" element={
        <RequireSetup>
          <SidebarProvider>
            <MainLayout>
              <Quests />
            </MainLayout>
          </SidebarProvider>
        </RequireSetup>
      } />
      
      <Route path="/daily-log" element={
        <RequireSetup>
          <SidebarProvider>
            <MainLayout>
              <DailyLog />
            </MainLayout>
          </SidebarProvider>
        </RequireSetup>
      } />

      <Route path="/shadows" element={
        <RequireSetup>
          <SidebarProvider>
            <MainLayout>
              <ShadowArmy />
            </MainLayout>
          </SidebarProvider>
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
