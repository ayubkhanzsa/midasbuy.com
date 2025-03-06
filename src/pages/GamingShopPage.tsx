import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useResponsive } from "@/hooks/use-mobile";
import NavigationTabs from "@/components/NavigationTabs";
import MobileNavigationTabs from "@/components/MobileNavigationTabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PromotionBanner from "@/components/PromotionBanner";

interface GamingShopProps {
  onLogout: () => void;
}

// Updated gaming products data with new images
const popularGames = [
  {
    id: "pubg-001",
    name: "PUBG MOBILE",
    image: "/lovable-uploads/856ab158-628e-4ea5-bc2a-cbef604d4450.png",
    tag: "EXTRA DISCOUNT",
    tagColor: "bg-orange-500"
  },
  {
    id: "delta-002",
    name: "DELTA FORCE: HAWK OPS",
    image: "/lovable-uploads/04aca1a0-5fd9-435b-98db-0577862ed939.png",
    tag: "NEW RELEASE",
    tagColor: "bg-green-500"
  },
  {
    id: "nikke-003",
    name: "GODDESS OF VICTORY: NIKKE",
    image: "/lovable-uploads/ff4c6724-7699-46a2-ae4e-d4597554b08c.png",
    tag: "POPULAR",
    tagColor: "bg-purple-500"
  },
  {
    id: "warpath-004",
    name: "WARPATH",
    image: "/lovable-uploads/bc6a32c0-e853-4fab-9702-faaa3b46f6a7.png",
    tag: "EXTRA BONUS",
    tagColor: "bg-red-500"
  },
  {
    id: "runeterra-005",
    name: "LEGENDS OF RUNETERRA",
    image: "/lovable-uploads/3bcb2d3b-038e-4c45-9758-d69a9aa66a4d.png",
    tag: "TOP RATED",
    tagColor: "bg-blue-500"
  },
  {
    id: "honor-006",
    name: "HONOR OF KINGS",
    image: "/lovable-uploads/1ebc2015-cced-4512-97ef-41ea5b45cbb3.png",
    tag: "FEATURED",
    tagColor: "bg-yellow-500"
  },
  {
    id: "assasin-007",
    name: "ASSASSIN'S CREED JADE",
    image: "/lovable-uploads/5b12ff1d-7fe9-4289-960b-9473171ba2db.png",
    tag: "COMING SOON",
    tagColor: "bg-gray-500"
  },
  {
    id: "pubg-008",
    name: "PUBG: NEW STATE",
    image: "/lovable-uploads/65f01d50-4fcd-42e6-b557-d74154b5fc40.png",
    tag: "PRE-ORDER",
    tagColor: "bg-indigo-500"
  }
];

// Sample news items
const newsItems = [
  {
    id: "news-001",
    title: "Purchase 2 packs in total for a gift draw opportunity.",
    image: "/lovable-uploads/42cba23d-8136-416a-ab7f-891c674cbce4.png",
    date: "2025-03-05",
    endDate: "",
    publisher: "Midasbuy"
  },
  {
    id: "news-002",
    title: "EXTRA BONUS UPSIZE only on Midasbuy. Enjoy up to 45% Bonus now.",
    image: "/lovable-uploads/e9f85ba7-1e65-424b-b3c7-335c54e95606.png",
    date: "2025-01-18",
    endDate: "2025-02-24",
    publisher: "Midasbuy"
  },
  {
    id: "news-003",
    title: "First recharge of the season gets free props.",
    image: "/lovable-uploads/c79df0c5-b617-4df7-9a31-a4c7bff7adf1.png",
    date: "2025-01-12",
    endDate: "2025-03-11",
    publisher: "Midasbuy"
  },
  {
    id: "news-004",
    title: "100% winning rate! Come and participate in the points lottery!",
    image: "/lovable-uploads/c58f845b-2ba6-4172-ab82-be1b39ac0320.png",
    date: "2024-12-29",
    endDate: "2025-06-30",
    publisher: "Midasbuy"
  }
];

const GamingShopPage = ({ onLogout }: GamingShopProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGameClick = (game: typeof popularGames[0]) => {
    toast({
      title: `${game.name} Selected`,
      description: "This product is not available yet. Coming soon!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <main className={`pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        <div className="w-full max-w-5xl mx-auto px-4">
          <NavigationTabs />
          <MobileNavigationTabs />
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Banner section */}
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img 
                  src="/lovable-uploads/55214c0a-5aad-45f3-b1e0-ab96c659a72e.png" 
                  alt="Midasbuy Promo" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="text-white text-xl font-bold mb-1">
                    EXTRA BONUS UPSIZE <span className="text-green-400">ONLY ON MIDASBUY</span>
                  </div>
                  <div className="text-white text-lg">
                    ENJOY UP TO <span className="text-green-400 font-bold">45%</span> BONUS NOW
                  </div>
                </div>
              </div>
              
              {/* Blue promotional banner */}
              {showBanner && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 rounded-lg flex justify-between items-center mb-6">
                  <span className="font-medium">EXTRA BONUS UPSIZE only on Midasbuy. Enjoy up to 45% Bonus now.</span>
                  <Button 
                    size="sm" 
                    className="bg-white text-blue-700 hover:bg-white/90 rounded-full px-4"
                  >
                    GO
                  </Button>
                </div>
              )}
              
              {/* Popular Games Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl text-white font-bold uppercase">POPULAR GAMES</h2>
                  <div className="text-xs text-gray-400 flex items-center">
                    <span className="inline-block w-2 h-2 bg-midasbuy-blue rounded-full mr-1"></span>
                    We are the official recharge store by Tencent
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {popularGames.slice(0, 4).map((game) => (
                    <div 
                      key={game.id} 
                      className="relative cursor-pointer rounded-xl overflow-hidden group"
                      onClick={() => handleGameClick(game)}
                    >
                      <img 
                        src={game.image} 
                        alt={game.name} 
                        className="w-full aspect-square object-cover rounded-xl transition-transform group-hover:scale-105"
                      />
                      {game.tag && (
                        <div className={`absolute top-2 left-2 ${game.tagColor} text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center`}>
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {game.tag}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <h3 className="text-white text-sm font-bold">{game.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {popularGames.slice(4, 8).map((game) => (
                    <div 
                      key={game.id} 
                      className="relative cursor-pointer rounded-xl overflow-hidden group"
                      onClick={() => handleGameClick(game)}
                    >
                      <img 
                        src={game.image} 
                        alt={game.name} 
                        className="w-full aspect-square object-cover rounded-xl transition-transform group-hover:scale-105"
                      />
                      {game.tag && (
                        <div className={`absolute top-2 left-2 ${game.tagColor} text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center`}>
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {game.tag}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <h3 className="text-white text-sm font-bold">{game.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Latest News Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-white font-bold uppercase">LATEST NEWS</h2>
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-800">
                    All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-midasbuy-navy/40 rounded-lg overflow-hidden cursor-pointer hover:bg-midasbuy-navy/60 transition-colors"
                    >
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-40 object-cover"
                        />
                        {item.endDate && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Ends in {item.endDate}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <p className="text-white text-sm mb-2">{item.title}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{item.publisher}</span>
                          <span className="mx-2">•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Social Media Follow Section */}
              <div className="bg-midasbuy-navy/40 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold mb-1">Follow Midasbuy</div>
                  <div className="text-gray-400 text-sm">For Exclusive Gifts!</div>
                </div>
                <div className="flex gap-2">
                  {["Twitter", "Facebook", "Instagram"].map((social) => (
                    <div key={social} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {social.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamingShopPage;
