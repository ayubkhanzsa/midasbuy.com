
import { useState, useRef, useEffect } from "react";
import { BellRing, X } from "lucide-react";

interface NotificationsMenuProps {
  hasNotifications: boolean;
  setHasNotifications: (hasNotifications: boolean) => void;
}

const NotificationsMenu = ({ hasNotifications, setHasNotifications }: NotificationsMenuProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      if (!isNotificationOpen) {
        setHasNotifications(true);
      }
    }, 30000); // Every 30 seconds for demo purposes
    
    return () => clearTimeout(notificationTimer);
  }, [isNotificationOpen, setHasNotifications]);

  const handleBellClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setHasNotifications(false);
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button 
        className="relative p-1.5 bg-midasbuy-blue/5 hover:bg-midasbuy-blue/10 rounded-full text-gray-300 hover:text-white transition-colors"
        onClick={handleBellClick}
      >
        <BellRing className="w-4 h-4" />
        {hasNotifications && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>
      
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-midasbuy-navy border-b border-gray-700 p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-bold">NOTIFICATIONS</h3>
                <button 
                  onClick={() => setIsNotificationOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-3">
              <div className="mb-3 p-3 bg-midasbuy-blue/10 rounded-md border border-midasbuy-blue/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-midasbuy-blue/20 p-2 rounded-md">
                    <BellRing className="w-5 h-5 text-midasbuy-blue" />
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-medium">New Season Update!</p>
                    <p className="text-gray-400 text-xs mt-1">Check out the latest PUBG Mobile season update with new rewards and challenges.</p>
                    <span className="text-gray-500 text-xs mt-2 block">2 hours ago</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3 p-3 bg-gray-800/40 rounded-md border border-gray-700">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-700 p-2 rounded-md">
                    <BellRing className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-medium">Special Discount</p>
                    <p className="text-gray-400 text-xs mt-1">Get 20% off on your next UC purchase. Limited time offer!</p>
                    <span className="text-gray-500 text-xs mt-2 block">Yesterday</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-800/40 rounded-md border border-gray-700">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-700 p-2 rounded-md">
                    <BellRing className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-medium">Account Security</p>
                    <p className="text-gray-400 text-xs mt-1">We've updated our security policies. Please review them.</p>
                    <span className="text-gray-500 text-xs mt-2 block">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-midasbuy-navy border-t border-gray-700 p-3">
              <button 
                className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
                onClick={() => setIsNotificationOpen(false)}
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;
