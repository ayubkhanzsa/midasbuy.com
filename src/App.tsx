
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
import HonorOfKingsPage from "./pages/HonorOfKingsPage";
import HonorOfKingsPurchasePage from "./pages/HonorOfKingsPurchasePage";
import HonorOfKingsCheckoutPage from "@/pages/HonorOfKingsCheckoutPage";
import AuthRoute from "./components/AuthRoute";

// Import the pages that exist
import AboutMidasbuy from "./components/AboutMidasbuy";
import HelpCenterPage from "./pages/HelpCenterPage";
import SecurityPage from "./pages/SecurityPage";
import FAQsPage from "./pages/FAQsPage";
import PaymentIssuesPage from "./pages/PaymentIssuesPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CopyrightNoticePage from "./pages/CopyrightNoticePage";
import ContactUsPage from "./pages/ContactUsPage";

const queryClient = new QueryClient();

function App() {
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

  const handleLogin = (username: string, password: string): boolean => {
    return login(username, password);
  };

  const handleLogout = () => {
    logout();
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
            <Route path="/" element={<AuthRoute><Index onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/purchase/:id" element={<AuthRoute><PurchasePage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/checkout/:id" element={<AuthRoute><CheckoutPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/honor-of-kings" element={<AuthRoute><HonorOfKingsPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/honor-of-kings/purchase/:id" element={<AuthRoute><HonorOfKingsPurchasePage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/honor-of-kings/checkout/:id" element={<AuthRoute><HonorOfKingsCheckoutPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/thankyou" element={<AuthRoute><ThankYouPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/events" element={<AuthRoute><EventsPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/gaming-shop" element={<AuthRoute><GamingShopPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/player-id" element={<AuthRoute><PlayerIdPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/purchase-history" element={<AuthRoute><PurchaseHistoryPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/help-center" element={<AuthRoute><HelpCenterPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/security" element={<AuthRoute><SecurityPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/about-midasbuy" element={<AuthRoute><AboutMidasbuy onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/faqs" element={<AuthRoute><FAQsPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/payment-issues" element={<AuthRoute><PaymentIssuesPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/refund-policy" element={<AuthRoute><RefundPolicyPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/terms-of-service" element={<AuthRoute><TermsOfServicePage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/copyright-notice" element={<AuthRoute><CopyrightNoticePage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="/contact-us" element={<AuthRoute><ContactUsPage onLogout={handleLogout} /></AuthRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
