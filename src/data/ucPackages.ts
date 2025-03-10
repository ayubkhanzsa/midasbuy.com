
export interface UCPackage {
  id: string;
  baseAmount: number;
  bonusAmount: number;
  discount: string;
  price: number;
  originalPrice: number;
  bonusPercent: string;
  image: string;
}

export const ucPackages: UCPackage[] = [
  {
    id: "60uc",
    baseAmount: 60,
    bonusAmount: 0,
    discount: "-10.1%",
    price: 0.89,
    originalPrice: 0.99,
    bonusPercent: "",
    image: "/lovable-uploads/6b0727f0-f8bd-4223-9e36-ffd7671fc90d.png"
  },
  {
    id: "300uc",
    baseAmount: 300,
    bonusAmount: 25,
    discount: "-10.02%",
    price: 4.49,
    originalPrice: 4.99,
    bonusPercent: "8%",
    image: "/lovable-uploads/6b0727f0-f8bd-4223-9e36-ffd7671fc90d.png"
  },
  {
    id: "600uc",
    baseAmount: 600,
    bonusAmount: 60,
    discount: "-10.01%",
    price: 8.99,
    originalPrice: 9.99,
    bonusPercent: "10%",
    image: "/lovable-uploads/6b0727f0-f8bd-4223-9e36-ffd7671fc90d.png"
  },
  {
    id: "1500uc",
    baseAmount: 1500,
    bonusAmount: 300,
    discount: "-10%",
    price: 22.49,
    originalPrice: 24.99,
    bonusPercent: "20%",
    image: "/lovable-uploads/6b0727f0-f8bd-4223-9e36-ffd7671fc90d.png"
  },
  {
    id: "3000uc",
    baseAmount: 3000,
    bonusAmount: 850,
    discount: "-10%",
    price: 44.99,
    originalPrice: 49.99,
    bonusPercent: "28%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "6000uc",
    baseAmount: 6000,
    bonusAmount: 2100,
    discount: "-10%",
    price: 89.99,
    originalPrice: 99.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "12000uc",
    baseAmount: 12000,
    bonusAmount: 4200,
    discount: "-10%",
    price: 179.99,
    originalPrice: 199.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "18000uc",
    baseAmount: 18000,
    bonusAmount: 6300,
    discount: "-10%",
    price: 269.99,
    originalPrice: 299.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "24000uc",
    baseAmount: 24000,
    bonusAmount: 8400,
    discount: "-10%",
    price: 359.99,
    originalPrice: 399.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "30000uc",
    baseAmount: 30000,
    bonusAmount: 10500,
    discount: "-10%",
    price: 449.99,
    originalPrice: 499.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  },
  {
    id: "60000uc",
    baseAmount: 60000,
    bonusAmount: 21000,
    discount: "-10%",
    price: 899.99,
    originalPrice: 999.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/6dcffa69-b046-4099-b802-d86a27b04cc3.png"
  }
];

export const getPackageById = (id: string): UCPackage | undefined => {
  return ucPackages.find(pkg => pkg.id === id);
};

// Get currently selected country from localStorage
export const getSelectedCountry = (): { code: string; currency: string } => {
  try {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      const country = JSON.parse(savedCountry);
      return { code: country.code, currency: country.currency };
    }
  } catch (error) {
    console.error('Error getting selected country:', error);
  }
  return { code: 'us', currency: 'USD' }; // Default to US/USD
};

// Create a broadcasted channel to communicate currency changes
export const setupCountryChangeListener = (callback: () => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'selectedCountry') {
      callback();
    }
  };
  
  // For direct changes in the same window
  const handleCustomEvent = () => {
    callback();
  };
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('countryChanged', handleCustomEvent);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('countryChanged', handleCustomEvent);
  };
};

// Trigger a custom event when country changes
export const triggerCountryChangeEvent = () => {
  const event = new CustomEvent('countryChanged');
  window.dispatchEvent(event);
};
