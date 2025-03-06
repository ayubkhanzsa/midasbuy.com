
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import MobileNavigationTabs from "@/components/MobileNavigationTabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package, Download } from "lucide-react";

interface PurchaseHistoryProps {
  onLogout: () => void;
}

// Sample purchase history data
const samplePurchases = [
  {
    id: "ORD-001-2023",
    date: "2023-10-15",
    product: "UC 600 + 60",
    price: "$9.99",
    currency: "USD",
    status: "Completed"
  },
  {
    id: "ORD-002-2023",
    date: "2023-11-02",
    product: "UC 1800 + 270",
    price: "$24.99",
    currency: "USD",
    status: "Completed"
  },
  {
    id: "ORD-003-2023",
    date: "2023-12-18",
    product: "Royal Pass",
    price: "$9.99",
    currency: "USD",
    status: "Completed"
  },
  {
    id: "ORD-004-2024",
    date: "2024-01-05",
    product: "UC 3000 + 500",
    price: "$49.99",
    currency: "USD",
    status: "Completed"
  }
];

const PurchaseHistoryPage = ({ onLogout }: PurchaseHistoryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState(samplePurchases);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <main className={`pt-20 pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        <div className="container mx-auto px-4 mt-16">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Purchase History</h1>
          
          <NavigationTabs />
          <MobileNavigationTabs />
          
          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="bg-midasbuy-navy/80 rounded-lg p-4 mb-6">
                  <h2 className="text-xl text-white font-semibold mb-2">Your Recent Purchases</h2>
                  <p className="text-gray-400">View and manage your PUBG Mobile purchase history</p>
                </div>
                
                <div className="grid gap-4">
                  {purchases.map((purchase) => (
                    <Card key={purchase.id} className="bg-midasbuy-navy/50 border-gray-700 overflow-hidden">
                      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Package className="w-5 h-5 text-midasbuy-blue mr-2" />
                            <h3 className="text-lg font-semibold text-white">{purchase.product}</h3>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{formatDate(purchase.date)}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              {purchase.status}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">Order ID: {purchase.id}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <div className="text-xl font-bold text-white mb-2">{purchase.price}</div>
                          <Button variant="outline" size="sm" className="text-xs border-midasbuy-blue/30 text-midasbuy-blue">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {purchases.length === 0 && (
                  <div className="text-center py-12 bg-midasbuy-navy/30 rounded-lg">
                    <div className="text-gray-400 mb-4">You have no purchase history yet</div>
                    <Button variant="default">Shop Now</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PurchaseHistoryPage;
