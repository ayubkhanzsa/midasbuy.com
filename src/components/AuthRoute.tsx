
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface AuthRouteProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const AuthRoute = ({ children, onLogout }: AuthRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-midasbuy-blue border-t-transparent animate-spin"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
