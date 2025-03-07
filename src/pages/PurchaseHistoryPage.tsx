
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-mobile";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Package, 
  Download, 
  User, 
  CreditCard, 
  DollarSign, 
  ShoppingBag, 
  Gift, 
  CheckCircle2, 
  Calendar,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { downloadReceipt } from "@/utils/receiptUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

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
  const [activeTab, setActiveTab] = useState("purchase");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [sessionUsername, setSessionUsername] = useState<string | null>(null);

  useEffect(() => {
    // Get the logged in username to associate with orders
    const username = localStorage.getItem("username");
    setSessionUsername(username);
    
    // Load purchase history from localStorage and sessionStorage
    const loadPurchaseHistory = () => {
      try {
        // Get purchase details from localStorage
        const purchaseDetails = localStorage.getItem("purchaseDetails");
        const existingOrders = localStorage.getItem("orderHistory");
        const sessionOrders = sessionStorage.getItem("sessionOrderHistory");
        
        let allOrders: OrderRecord[] = [];
        
        // Parse existing orders if available
        if (existingOrders) {
          allOrders = JSON.parse(existingOrders);
        }
        
        // Parse session orders and merge if available
        if (sessionOrders) {
          const parsedSessionOrders = JSON.parse(sessionOrders);
          // Merge avoiding duplicates
          parsedSessionOrders.forEach((sessionOrder: OrderRecord) => {
            if (!allOrders.some(order => order.id === sessionOrder.id)) {
              allOrders.push(sessionOrder);
            }
          });
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
            
            // Store in both localStorage and sessionStorage for cross-device sync
            localStorage.setItem("orderHistory", JSON.stringify(allOrders));
            sessionStorage.setItem("sessionOrderHistory", JSON.stringify(allOrders));
            
            // Show success toast
            toast({
              title: "Purchase Recorded",
              description: "Your purchase has been added to your history.",
              variant: "default",
            });
          }
          
          // Clear the purchase details to avoid duplicating it on refresh
          localStorage.removeItem("purchaseDetails");
        }
        
        // If no orders are available, use sample data
        if (allOrders.length === 0) {
          allOrders = [
            {
              id: "TX282566772",
              date: "2023-06-03T14:03:00.000Z",
              product: "UC 660",
              price: "$8.99",
              currency: "USD",
              status: "Completed",
              playerID: "267272727272",
              username: username || "admin",
              paymentMethod: "PayPal",
              packageDetails: {
                baseAmount: 600,
                bonusAmount: 60
              }
            },
            {
              id: "ORD-001-2023",
              date: "2023-10-15T14:22:37.000Z",
              product: "UC 600 + 60",
              price: "$9.99",
              currency: "USD",
              status: "Completed",
              playerID: "5247896321",
              username: username || "TigerGamer",
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
              username: username || "TigerGamer",
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
              username: username || "TigerGamer",
              paymentMethod: "Credit Card",
              packageDetails: {
                baseAmount: 0,
                bonusAmount: 0
              }
            }
          ];
          
          // Store sample data in both storage types
          localStorage.setItem("orderHistory", JSON.stringify(allOrders));
          sessionStorage.setItem("sessionOrderHistory", JSON.stringify(allOrders));
        }
        
        // Sort orders by date (newest first)
        allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
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
    
    // Sync with other tabs/windows using storage event
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "orderHistory" && event.newValue) {
        try {
          const updatedOrders = JSON.parse(event.newValue);
          setPurchases(updatedOrders);
        } catch (error) {
          console.error("Error parsing updated orders:", error);
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
    };
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

  const handleOrderClick = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const handleDownloadReceipt = (order: OrderRecord) => {
    setSelectedOrder(order);
    setReceiptDialogOpen(true);
    
    // Use setTimeout to ensure the receipt is rendered before downloading
    setTimeout(() => {
      if (receiptRef.current) {
        downloadReceipt(receiptRef.current, order.id);
        setReceiptDialogOpen(false);
      }
    }, 500);
  };

  const navigationItems = [
    { id: "purchase", label: "PURCHASE", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "redeem", label: "REDEEM", icon: <Gift className="w-4 h-4" /> },
    { id: "shop", label: "SHOP", icon: <Package className="w-4 h-4" /> },
    { id: "events", label: "EVENTS", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <main className={`pt-20 pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        <div className="container mx-auto px-4 mt-16">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Purchase History</h1>
          
          {/* Custom Navigation Tabs */}
          <div className="bg-midasbuy-navy rounded-lg overflow-hidden mb-6 shadow-lg border border-midasbuy-navy/50">
            <div className="flex">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex-1 py-3 px-4 text-center transition-colors flex items-center justify-center gap-2 ${
                    activeTab === item.id 
                      ? "bg-midasbuy-blue text-white font-medium border-b-2 border-midasbuy-gold" 
                      : "text-gray-400 hover:bg-midasbuy-navy/70"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon}
                  <span className={isMobile ? "text-xs" : ""}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          
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
                    <Card 
                      key={purchase.id} 
                      className="bg-midasbuy-navy/50 border-gray-700 overflow-hidden hover:bg-midasbuy-navy/60 transition-colors"
                    >
                      {/* Compact Order Header (Always Visible) */}
                      <div 
                        className="p-0 cursor-pointer"
                        onClick={() => handleOrderClick(purchase.id)}
                      >
                        <div className="grid grid-cols-[auto_1fr_auto] border-b border-blue-900/30">
                          <div className="p-4 flex items-center gap-3 bg-midasbuy-blue/10">
                            <div className="flex-shrink-0">
                              <div className="bg-midasbuy-blue/20 p-2 rounded-full">
                                <Package className="w-6 h-6 text-midasbuy-blue" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{purchase.product}</h3>
                              {purchase.packageDetails && purchase.packageDetails.bonusAmount > 0 && (
                                <div className="text-xs text-midasbuy-gold">
                                  {purchase.packageDetails.baseAmount} + {purchase.packageDetails.bonusAmount} Bonus UC
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-midasbuy-navy/80 py-2 px-4 flex items-center">
                            <div className="flex items-center text-sm text-gray-400">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{formatDate(purchase.date)}</span>
                            </div>
                          </div>
                          
                          <div className="bg-midasbuy-navy/80 py-2 px-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {purchase.status}
                              </span>
                              <span className="text-midasbuy-gold font-bold">{purchase.price}</span>
                            </div>
                            {expandedOrder === purchase.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Details (Only Visible When Clicked) */}
                      {expandedOrder === purchase.id && (
                        <CardContent className="p-4 bg-midasbuy-navy/30 animate-accordion-down">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Player Information</div>
                                <div className="flex gap-3 items-start p-3 bg-midasbuy-navy/40 rounded-md">
                                  <User className="w-4 h-4 text-midasbuy-blue mt-0.5" />
                                  <div className="space-y-2 flex-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400 text-sm">ID:</span>
                                      <span className="text-white font-medium text-sm">{purchase.playerID}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-t border-gray-700/50 pt-2">
                                      <span className="text-gray-400 text-sm">Username:</span>
                                      <span className="text-white font-medium text-sm">{purchase.username}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Payment Details</div>
                                <div className="flex gap-3 items-start p-3 bg-midasbuy-navy/40 rounded-md">
                                  <CreditCard className="w-4 h-4 text-midasbuy-blue mt-0.5" />
                                  <div className="space-y-2 flex-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400 text-sm">Method:</span>
                                      <span className="text-white font-medium text-sm">{purchase.paymentMethod}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-t border-gray-700/50 pt-2">
                                      <span className="text-gray-400 text-sm">Order ID:</span>
                                      <span className="text-white font-medium text-sm">{purchase.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Transaction Summary</div>
                                <div className="flex gap-3 items-start p-3 bg-midasbuy-navy/40 rounded-md">
                                  <DollarSign className="w-4 h-4 text-midasbuy-gold mt-0.5" />
                                  <div className="space-y-2 flex-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400 text-sm">Amount:</span>
                                      <span className="text-midasbuy-gold font-bold text-lg">{purchase.price}</span>
                                    </div>
                                    
                                    <div className="flex justify-between border-t border-gray-700/50 pt-2">
                                      <span className="text-gray-400 text-sm">Currency:</span>
                                      <span className="text-white font-medium text-sm">{purchase.currency}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-midasbuy-blue/30 text-midasbuy-blue"
                              onClick={() => handleDownloadReceipt(purchase)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download Receipt
                            </Button>
                          </div>
                        </CardContent>
                      )}
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
      
      {/* Receipt dialog for download */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="bg-midasbuy-navy border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Generating Receipt...</DialogTitle>
            <DialogDescription className="text-gray-400">
              Your receipt is being prepared for download
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div ref={receiptRef} className="p-6 bg-midasbuy-darkBlue rounded-lg border border-midasbuy-blue/30">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-midasbuy-gold">MIDASBUY RECEIPT</h2>
                <p className="text-gray-400 text-sm">Transaction Details</p>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-2">
                  <h3 className="text-md font-medium text-white mb-2">Order Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-white font-medium">{selectedOrder.id}</span>
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{formatDate(selectedOrder.date)}</span>
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-medium">{selectedOrder.status}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-700 pb-2">
                  <h3 className="text-md font-medium text-white mb-2">Product Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-400">Product:</span>
                    <span className="text-white font-medium">{selectedOrder.product}</span>
                    {selectedOrder.packageDetails && selectedOrder.packageDetails.bonusAmount > 0 && (
                      <>
                        <span className="text-gray-400">Base Amount:</span>
                        <span className="text-white">{selectedOrder.packageDetails.baseAmount} UC</span>
                        <span className="text-gray-400">Bonus:</span>
                        <span className="text-midasbuy-gold">{selectedOrder.packageDetails.bonusAmount} UC</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="border-b border-gray-700 pb-2">
                  <h3 className="text-md font-medium text-white mb-2">User Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-400">Player ID:</span>
                    <span className="text-white">{selectedOrder.playerID}</span>
                    <span className="text-gray-400">Username:</span>
                    <span className="text-white">{selectedOrder.username}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-white mb-2">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-midasbuy-gold font-bold">{selectedOrder.price}</span>
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white">{selectedOrder.paymentMethod}</span>
                    <span className="text-gray-400">Currency:</span>
                    <span className="text-white">{selectedOrder.currency}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">Thank you for your purchase!</p>
                <p className="text-xs text-gray-500">For support: support@midasbuy.com</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseHistoryPage;
