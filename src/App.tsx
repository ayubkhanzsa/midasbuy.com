
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PurchasePage from "./pages/PurchasePage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import EventsPage from "./pages/EventsPage";
import PlayerIdPage from "./pages/PlayerIdPage";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import GamingShopPage from "./pages/GamingShopPage";
import AuthRoute from "./components/AuthRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === "Ayub" && password === "1ayubkhan") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-midasbuy-blue border-t-transparent animate-spin"></div>
    </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login onLogin={login} />
            } />
            <Route path="/" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <Index onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/player-id" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <PlayerIdPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/purchase-history" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <PurchaseHistoryPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/gaming-shop" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <GamingShopPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/purchase/:id" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <PurchasePage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/checkout/:id" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <CheckoutPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/thankyou" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <ThankYouPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="/events" element={
              <AuthRoute isAuthenticated={isAuthenticated} redirectTo="/login">
                <EventsPage onLogout={logout} />
              </AuthRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
