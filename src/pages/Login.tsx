
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = onLogin(username, password);
      
      if (!success) {
        toast({
          title: "Authentication Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-midasbuy-darkBlue">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
      
      <div className="relative w-full max-w-md mx-auto p-6 animate-fade-in">
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="MidasBuy" className="h-12" />
        </div>
        
        <div className="glass-effect rounded-xl overflow-hidden shadow-xl border border-midasbuy-blue/20 animate-scale-up p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-midasbuy-navy/50 border-midasbuy-blue/30 text-white focus:border-midasbuy-blue focus:ring-midasbuy-blue/20"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-midasbuy-blue hover:bg-blue-600 text-white font-medium py-2 rounded-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-midasbuy-blue/50 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Demo Credentials: "Ayub" / "1ayubkhan"
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© 2023 MidasBuy. All rights reserved.</p>
          <p className="mt-2">This is a demo website for educational purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
