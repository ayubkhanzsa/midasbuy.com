
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
      <div className="glass-effect rounded-xl p-8 max-w-md w-full mx-4 text-center animate-fade-in">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-midasbuy-navy border border-midasbuy-blue/30">
            <span className="text-5xl font-bold bg-gradient-to-r from-midasbuy-blue to-blue-400 bg-clip-text text-transparent">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-midasbuy-blue hover:bg-blue-600 text-white font-medium transition-all">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
