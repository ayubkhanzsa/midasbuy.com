
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import MobileNavigationTabs from "@/components/MobileNavigationTabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Package, Download, User, CreditCard, DollarSign } from "lucide-react";

interface PurchaseHistoryProps {
  onLogout: () => void;
}

interface OrderRecord {
  id: string;
  date: string;
  product: string;
  price: string;
  currency: string;
  status: string;
  playerID?: string;
  username?: string;
  paymentMethod?: string;
  packageDetails?: {
    baseAmount: number;
    bonusAmount: number;
  };
}

const PurchaseHistoryPage = ({ onLogout }: PurchaseHistoryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<OrderRecord[]>([]);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    // Load purchase history from localStorage
    const loadPurchaseHistory = () => {
      try {
        // Get purchase details from localStorage
        const purchaseDetails = localStorage.getItem("purchaseDetails");
        const existingOrders = localStorage.getItem("orderHistory");
        
        let allOrders: OrderRecord[] = [];
        
        // Parse existing orders if available
        if (existingOrders) {
          allOrders = JSON.parse(existingOrders);
        }
        
        // Add new purchase details if available
        if (purchaseDetails) {
          const newPurchase = JSON.parse(purchaseDetails);
          
          // Create a new order record
          const newOrder: OrderRecord = {
            id: newPurchase.transactionId || `ORD-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`,
            date: newPurchase.purchaseDate || new Date().toISOString(),
            product: `UC ${newPurchase.baseAmount + newPurchase.bonusAmount}`,
            price: `$${newPurchase.price.toFixed(2)}`,
            currency: "USD",
            status: "Completed",
            playerID: newPurchase.playerID,
            username: newPurchase.username,
            paymentMethod: newPurchase.paymentMethod,
            packageDetails: {
              baseAmount: newPurchase.baseAmount,
              bonusAmount: newPurchase.bonusAmount
            }
          };
          
          // Check if this order already exists to avoid duplicates
          if (!allOrders.some(order => order.id === newOrder.id)) {
            allOrders = [newOrder, ...allOrders];
            localStorage.setItem("orderHistory", JSON.stringify(allOrders));
          }
          
          // Clear the purchase details to avoid duplicating it on refresh
          localStorage.removeItem("purchaseDetails");
        }
        
        // If no orders are available, use sample data
        if (allOrders.length === 0) {
          allOrders = [
            {
              id: "ORD-001-2023",
              date: "2023-10-15T14:22:37.000Z",
              product: "UC 600 + 60",
              price: "$9.99",
              currency: "USD",
              status: "Completed",
              playerID: "5247896321",
              username: "TigerGamer",
              paymentMethod: "Credit Card",
              packageDetails: {
                baseAmount: 600,
                bonusAmount: 60
              }
            },
            {
              id: "ORD-002-2023",
              date: "2023-11-02T08:15:22.000Z",
              product: "UC 1800 + 270",
              price: "$24.99",
              currency: "USD",
              status: "Completed",
              playerID: "5247896321",
              username: "TigerGamer",
              paymentMethod: "PayPal",
              packageDetails: {
                baseAmount: 1800,
                bonusAmount: 270
              }
            },
            {
              id: "ORD-003-2023",
              date: "2023-12-18T19:45:11.000Z",
              product: "Royal Pass",
              price: "$9.99",
              currency: "USD",
              status: "Completed",
              playerID: "5247896321",
              username: "TigerGamer",
              paymentMethod: "Credit Card",
              packageDetails: {
                baseAmount: 0,
                bonusAmount: 0
              }
            }
          ];
        }
        
        setPurchases(allOrders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading purchase history:", error);
        setIsLoading(false);
      }
    };
    
    // Simulate loading time
    const timer = setTimeout(() => {
      loadPurchaseHistory();
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
                    <Card key={purchase.id} className="bg-midasbuy-navy/50 border-gray-700 overflow-hidden hover:bg-midasbuy-navy/60 transition-colors">
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
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                            {purchase.playerID && (
                              <div className="flex items-center text-xs text-gray-400">
                                <User className="w-3 h-3 mr-1" />
                                <span>ID: {purchase.playerID}</span>
                              </div>
                            )}
                            
                            {purchase.username && (
                              <div className="flex items-center text-xs text-gray-400">
                                <span>Username: {purchase.username}</span>
                              </div>
                            )}
                            
                            {purchase.paymentMethod && (
                              <div className="flex items-center text-xs text-gray-400">
                                <CreditCard className="w-3 h-3 mr-1" />
                                <span>{purchase.paymentMethod}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              {purchase.status}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">Order ID: {purchase.id}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <div className="flex items-center mb-2">
                            <DollarSign className="w-4 h-4 text-midasbuy-gold mr-1" />
                            <div className="text-xl font-bold text-midasbuy-gold">{purchase.price}</div>
                          </div>
                          
                          {purchase.packageDetails && purchase.packageDetails.bonusAmount > 0 && (
                            <div className="text-xs text-gray-400 mb-2">
                              {purchase.packageDetails.baseAmount} + {purchase.packageDetails.bonusAmount} Bonus UC
                            </div>
                          )}
                          
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
