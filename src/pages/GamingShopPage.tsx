
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

interface GamingShopProps {
  onLogout: () => void;
}

// Sample gaming products data
const gamingProducts = [
  {
    id: "ff-001",
    name: "Free Fire Diamonds",
    description: "Top up diamonds for Free Fire",
    image: "/lovable-uploads/333f582a-7003-458b-b65f-efc04362d041.png",
    price: "From $0.99",
    featured: true,
    popular: true
  },
  {
    id: "cod-001",
    name: "Call of Duty Points",
    description: "COD Points for unlocking content",
    image: "/lovable-uploads/3a733dab-e588-4b87-b11b-6860d5551ec9.png",
    price: "From $4.99",
    featured: false,
    popular: true
  },
  {
    id: "ml-001",
    name: "Mobile Legends Diamonds",
    description: "Mobile Legends currency",
    image: "/lovable-uploads/125e1b88-0b19-40bd-936e-c226516c57f0.png",
    price: "From $2.99",
    featured: true,
    popular: true
  },
  {
    id: "genshin-001",
    name: "Genshin Impact Crystals",
    description: "Genesis Crystals for Genshin Impact",
    image: "/lovable-uploads/672fb8ab-f17f-423f-a575-b08b5baed1d6.png",
    price: "From $4.99",
    featured: false,
    popular: true
  },
  {
    id: "roblox-001",
    name: "Roblox Robux",
    description: "Robux for in-game purchases",
    image: "/lovable-uploads/a784386a-71a2-4d02-b3df-c904d9c9d80b.png",
    price: "From $4.99",
    featured: true,
    popular: false
  },
  {
    id: "fortnite-001",
    name: "Fortnite V-Bucks",
    description: "V-Bucks for Fortnite Store",
    image: "/lovable-uploads/17590eb9-a257-432b-bd97-5ccfa3ee5ed5.png",
    price: "From $7.99",
    featured: false,
    popular: true
  }
];

const GamingShopPage = ({ onLogout }: GamingShopProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(gamingProducts);
  const [activeFilter, setActiveFilter] = useState("all");
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setProducts(gamingProducts);
    } else if (filter === "featured") {
      setProducts(gamingProducts.filter(product => product.featured));
    } else if (filter === "popular") {
      setProducts(gamingProducts.filter(product => product.popular));
    }
  };

  const handleProductClick = (product: typeof gamingProducts[0]) => {
    toast({
      title: `${product.name} Selected`,
      description: "This product is not available yet. Coming soon!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-midasbuy-darkBlue overflow-x-hidden relative">
      <div className={isMobile ? 'mobile-header' : ''}>
        <Header onLogout={onLogout} />
      </div>
      
      <main className={`pt-20 pb-20 relative ${isMobile ? 'mobile-content mobile-main-container' : 'z-10'}`}>
        <div className="container mx-auto px-4 mt-16">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Gaming Shop</h1>
          
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
                  <h2 className="text-xl text-white font-semibold mb-2">Game Currency & Items</h2>
                  <p className="text-gray-400">Shop for in-game currency and items for popular games</p>
                </div>
                
                <div className="flex justify-center mb-6 space-x-2">
                  <Button 
                    variant={activeFilter === "all" ? "default" : "outline"} 
                    onClick={() => handleFilterChange("all")}
                    className={activeFilter === "all" ? "bg-midasbuy-blue" : "text-white"}
                    size="sm"
                  >
                    All Games
                  </Button>
                  <Button 
                    variant={activeFilter === "featured" ? "default" : "outline"} 
                    onClick={() => handleFilterChange("featured")}
                    className={activeFilter === "featured" ? "bg-midasbuy-blue" : "text-white"}
                    size="sm"
                  >
                    Featured
                  </Button>
                  <Button 
                    variant={activeFilter === "popular" ? "default" : "outline"} 
                    onClick={() => handleFilterChange("popular")}
                    className={activeFilter === "popular" ? "bg-midasbuy-blue" : "text-white"}
                    size="sm"
                  >
                    Popular
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card 
                      key={product.id} 
                      className="bg-midasbuy-navy/50 border-gray-700 overflow-hidden hover:border-midasbuy-blue/50 transition-all duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-40 object-cover"
                        />
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-midasbuy-gold/90 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-midasbuy-gold font-semibold">{product.price}</span>
                          <Button variant="default" size="sm" className="bg-midasbuy-blue">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {products.length === 0 && (
                  <div className="text-center py-12 bg-midasbuy-navy/30 rounded-lg">
                    <div className="text-gray-400 mb-4">No products found</div>
                    <Button variant="default">Browse All</Button>
                  </div>
                )}
                
                <div className="mt-10 flex justify-center">
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/5 group">
                    View More Games
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamingShopPage;
