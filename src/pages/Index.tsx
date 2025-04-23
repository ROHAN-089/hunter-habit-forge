
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isSetupComplete } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect based on setup status
    if (isSetupComplete) {
      navigate("/dashboard");
    } else {
      navigate("/setup");
    }
  }, [isSetupComplete, navigate]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-solo-purple-dark">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-solo-purple-light">Solo Leveling</h1>
        <p className="text-xl text-gray-400">Loading your hunter profile...</p>
      </div>
    </div>
  );
};

export default Index;
