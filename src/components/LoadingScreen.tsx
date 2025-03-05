
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-midasbuy-darkBlue">
    <div className="text-center">
      <img 
        src="/lovable-uploads/c6fd77e7-3682-428e-8154-140308b4a06b.png" 
        alt="Logo" 
        className="h-10 mx-auto mb-6 animate-pulse-subtle" 
      />
      <div className="w-12 h-12 border-4 border-midasbuy-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-400 animate-pulse">Loading PUBG Mobile...</p>
    </div>
  </div>
);

export default LoadingScreen;
