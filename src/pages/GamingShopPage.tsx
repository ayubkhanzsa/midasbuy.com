
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
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import AboutMidasbuy from "@/components/AboutMidasbuy";
import FeatureBoxesCarousel from "@/components/FeatureBoxesCarousel";

interface GamingShopProps {
  onLogout: () => void;
}

const popularGames = [
  {
    id: "pubg-001",
    name: "PUBG MOBILE",
    image: "/lovable-uploads/1ebc2015-cced-4512-97ef-41ea5b45cbb3.png",
    tag: "FEATURED",
    tagColor: "bg-yellow-500"
  },
  {
    id: "honor-001",
    name: "HONOR OF KINGS",
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
  },
  {
    id: "league-of-legends-009",
    name: "LEAGUE OF LEGENDS: WILD RIFT",
    image: "/lovable-uploads/c70acce8-ae36-4427-b857-e7eaad1c4a83.png",
    tag: "TOP PLAYED",
    tagColor: "bg-pink-500"
  },
  {
    id: "huang-010",
    name: "HUANG",
    image: "/lovable-uploads/902150dc-2450-4a9d-9038-9af359a67315.png",
    tag: "NEW GAME",
    tagColor: "bg-blue-400"
  },
  {
    id: "air-command-011",
    name: "AIR COMMAND",
    image: "/lovable-uploads/b5182d46-5cf8-490f-b0c2-35d4566044a6.png",
    tag: "TRENDING",
    tagColor: "bg-amber-600"
  },
  {
    id: "tacticool-012",
    name: "TACTICOOL",
    image: "/lovable-uploads/dff4c98c-5640-4d01-ad2b-7078ffdfa1f8.png",
    tag: "TACTICAL",
    tagColor: "bg-gray-600"
  },
  {
    id: "nba-live-013",
    name: "NBA LIVE",
    image: "/lovable-uploads/ff4286e3-719a-4084-a7b0-05a04b251171.png",
    tag: "SPORTS",
    tagColor: "bg-blue-500"
  }
];

const newsItems = [
  {
    id: "news-001",
    title: "Get extra 100% NIKKE bonus on first top-up!",
    image: "/lovable-uploads/dfb25af0-bb1f-4633-96bd-82035761c5b8.png",
    date: "2025-03-10",
    endDate: "2025-04-10",
    publisher: "Midasbuy"
  },
  {
    id: "news-002",
    title: "Register to get free skin",
    image: "/lovable-uploads/ccdccbbc-23f6-4c12-8ce8-2e6c870ef1ac.png",
    date: "2025-03-08",
    endDate: "2025-04-08",
    publisher: "Arena Breakout"
  },
  {
    id: "news-004",
    title: "Mad Dog Games Lucky Treasure Hunt",
    image: "/lovable-uploads/70aa4e1a-aaa1-4c17-86df-b193db69edda.png",
    date: "2025-03-01",
    endDate: "2025-04-01",
    publisher: "Arena Breakout"
  },
  {
    id: "news-005",
    title: "Honor of Kings Points Lottery",
    image: "/lovable-uploads/58cd039f-6539-4372-b355-7e539896a7b2.png",
    date: "2025-02-28",
    endDate: "2025-03-28",
    publisher: "Honor of Kings"
  },
  {
    id: "news-006",
    title: "Apex Coin Bonanza: First Buy, 2x Value!",
    image: "/lovable-uploads/efcede1b-7e48-4ba0-81b9-875826d9b87a.png",
    date: "2025-02-25",
    endDate: "2025-03-25",
    publisher: "Age of Empires"
  },
  {
    id: "news-007",
    title: "PUBG MOBILE VIP Benefits",
    image: "/lovable-uploads/93d886d7-d872-4c31-850e-9938cfb8da17.png",
    date: "2025-02-20",
    endDate: "2025-03-20",
    publisher: "PUBG MOBILE"
  },
  {
    id: "news-008",
    title: "Purchase Bonus",
    image: "/lovable-uploads/949a4bdb-d126-4908-bf41-15b6af918ea8.png",
    date: "2025-02-15",
    endDate: "2025-03-15",
    publisher: "PUBG MOBILE"
  },
  {
    id: "news-009",
    title: "EXTRA BONUS ONLY ON MIDASBUY ENJOY UP TO 45% BONUS NOW",
    image: "/lovable-uploads/2a70916a-be50-4ce2-a7ef-882b961fe54d.png",
    date: "2025-02-10",
    endDate: "2025-03-10",
    publisher: "Delta Force"
  },
  {
    id: "news-010",
    title: "Age of Empires Daily Packs",
    image: "/lovable-uploads/cbd92d2e-e670-4c2c-b5dd-4edd925ea8c4.png",
    date: "2025-02-05",
    endDate: "2025-03-05",
    publisher: "Age of Empires"
  }
];

const GamingShopPage = ({ onLogout }: GamingShopProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGameClick = (game: typeof popularGames[0]) => {
    if (game.name === "PUBG MOBILE") {
      navigate("/pubg-mobile");
    } else if (game.name === "HONOR OF KINGS") {
      navigate("/honor-of-kings");
    } else {
      toast({
        title: `${game.name} Selected`,
        description: "This product is not available yet. Coming soon!",
        variant: "default",
      });
    }
  };

  const handlePlayerIdClick = () => {
    navigate("/player-id");
  };

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      {/* Corner light effect */}
      <div className="corner-light-effect"></div>
      
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
              {showBanner && <PromotionBanner onClose={() => setShowBanner(false)} />}
              
              <div className="mb-8 mt-6">
                <FeatureBoxesCarousel className="" />
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl text-white font-bold uppercase">POPULAR GAMES</h2>
                  <div className="text-xs text-gray-400 flex items-center">
                    <span className="inline-block w-2 h-2 bg-midasbuy-blue rounded-full mr-1"></span>
                    We are the official recharge store by Tencent
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {popularGames.slice(0, 8).map((game) => (
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
                  {popularGames.slice(8, 13).map((game) => (
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
              
              {showBanner && <PromotionBanner onClose={() => setShowBanner(false)} />}
              
              <div className="mb-8 mt-12">
                <FeatureBoxesCarousel className="" />
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl text-white font-bold tracking-wide">LATEST NEWS</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    All
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-midasbuy-navy/40 rounded-lg overflow-hidden cursor-pointer hover:bg-midasbuy-navy/60 transition-all duration-300"
                    >
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-48 object-cover transform transition-transform group-hover:scale-105 duration-300"
                        />
                        {item.endDate && (
                          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                            Ends in {format(new Date(item.endDate), "yyyy-MM-dd")}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-white text-lg font-medium mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="font-medium">{item.publisher}</span>
                          <span className="mx-2">•</span>
                          <span>{format(new Date(item.date), "yyyy-MM-dd")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <AboutMidasbuy />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamingShopPage;
