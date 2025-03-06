
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Country } from "./types";

interface CountrySelectorProps {
  currentCountry: Country;
  setCurrentCountry: (country: Country) => void;
}

const CountrySelector = ({ currentCountry, setCurrentCountry }: CountrySelectorProps) => {
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  
  // List of countries
  const countries: Country[] = [
    { name: "United States", code: "us", region: "North America", currency: "USD" },
    { name: "Canada", code: "ca", region: "North America", currency: "CAD" },
    { name: "Brazil", code: "br", region: "Latin American and the Caribbean", currency: "BRL" },
    { name: "Chile", code: "cl", region: "Latin American and the Caribbean", currency: "CLP" },
    { name: "Colombia", code: "co", region: "Latin American and the Caribbean", currency: "COP" },
    { name: "Mexico", code: "mx", region: "Latin American and the Caribbean", currency: "MXN" },
    { name: "Peru", code: "pe", region: "Latin American and the Caribbean", currency: "PEN" },
    { name: "France", code: "fr", region: "Europe", currency: "EUR" },
    { name: "Germany", code: "de", region: "Europe", currency: "EUR" },
    { name: "Italy", code: "it", region: "Europe", currency: "EUR" },
    { name: "Spain", code: "es", region: "Europe", currency: "EUR" },
    { name: "United Kingdom", code: "gb", region: "Europe", currency: "GBP" },
    { name: "Slovenia", code: "si", region: "Europe", currency: "EUR" },
    { name: "Slovakia", code: "sk", region: "Europe", currency: "EUR" },
    { name: "Türkiye", code: "tr", region: "Europe", currency: "TRY" },
    { name: "Ukraine", code: "ua", region: "Europe", currency: "UAH" },
    { name: "Russia", code: "ru", region: "Europe", currency: "RUB" },
    { name: "Poland", code: "pl", region: "Europe", currency: "PLN" },
    { name: "Switzerland", code: "ch", region: "Europe", currency: "CHF" },
    { name: "Sweden", code: "se", region: "Europe", currency: "SEK" },
    { name: "Norway", code: "no", region: "Europe", currency: "NOK" },
    { name: "Japan", code: "jp", region: "Asia and Oceania", currency: "JPY" },
    { name: "China", code: "cn", region: "Asia and Oceania", currency: "CNY" },
    { name: "India", code: "in", region: "Asia and Oceania", currency: "INR" },
    { name: "Australia", code: "au", region: "Asia and Oceania", currency: "AUD" },
    { name: "Armenia", code: "am", region: "Asia and Oceania", currency: "AMD" },
    { name: "Bangladesh", code: "bd", region: "Asia and Oceania", currency: "BDT" },
    { name: "Bhutan", code: "bt", region: "Asia and Oceania", currency: "BTN" },
    { name: "Cambodia", code: "kh", region: "Asia and Oceania", currency: "KHR" },
    { name: "Hong Kong", code: "hk", region: "Asia and Oceania", currency: "HKD" },
    { name: "Indonesia", code: "id", region: "Asia and Oceania", currency: "IDR" },
    { name: "Kazakhstan", code: "kz", region: "Asia and Oceania", currency: "KZT" },
    { name: "Kyrgyzstan", code: "kg", region: "Asia and Oceania", currency: "KGS" },
    { name: "Laos", code: "la", region: "Asia and Oceania", currency: "LAK" },
    { name: "Malaysia", code: "my", region: "Asia and Oceania", currency: "MYR" },
    { name: "Myanmar (Burma)", code: "mm", region: "Asia and Oceania", currency: "MMK" },
    { name: "Macao", code: "mo", region: "Asia and Oceania", currency: "MOP" },
    { name: "Mongolia", code: "mn", region: "Asia and Oceania", currency: "MNT" },
    { name: "Maldives", code: "mv", region: "Asia and Oceania", currency: "MVR" },
    { name: "New Zealand", code: "nz", region: "Asia and Oceania", currency: "NZD" },
    { name: "Pakistan", code: "pk", region: "Asia and Oceania", currency: "PKR" },
    { name: "Philippines", code: "ph", region: "Asia and Oceania", currency: "PHP" },
    { name: "Singapore", code: "sg", region: "Asia and Oceania", currency: "SGD" },
    { name: "South Korea", code: "kr", region: "Asia and Oceania", currency: "KRW" },
    { name: "Sri Lanka", code: "lk", region: "Asia and Oceania", currency: "LKR" },
    { name: "Taiwan", code: "tw", region: "Asia and Oceania", currency: "TWD" },
    { name: "Thailand", code: "th", region: "Asia and Oceania", currency: "THB" },
    { name: "Vietnam", code: "vn", region: "Asia and Oceania", currency: "VND" },
    { name: "Egypt", code: "eg", region: "Africa and Middle East", currency: "EGP" },
    { name: "Israel", code: "il", region: "Africa and Middle East", currency: "ILS" },
    { name: "Saudi Arabia", code: "sa", region: "Africa and Middle East", currency: "SAR" },
    { name: "United Arab Emirates", code: "ae", region: "Africa and Middle East", currency: "AED" },
    { name: "South Africa", code: "za", region: "Africa and Middle East", currency: "ZAR" },
    { name: "Nigeria", code: "ng", region: "Africa and Middle East", currency: "NGN" },
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(query) || 
        country.region.toLowerCase().includes(query) ||
        country.currency.toLowerCase().includes(query)
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);

  const groupedCountries = filteredCountries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {} as Record<string, Country[]>);

  const handleSelectCountry = (country: Country) => {
    setCurrentCountry(country);
    setIsCountryMenuOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={countryMenuRef}>
      <button 
        className="flex items-center text-gray-300 hover:text-white transition-colors text-xs px-2 py-1"
        onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
      >
        <img 
          src={`https://flagcdn.com/w20/${currentCountry.code}.png`} 
          alt={currentCountry.name} 
          className="w-4 h-3 mr-1" 
        />
        <span className="hidden sm:inline">{currentCountry.name}</span>
        <span className="text-xs ml-1 text-midasbuy-gold">{currentCountry.currency}</span>
        <ChevronDown className="w-3 h-3 ml-1" />
      </button>
      
      {isCountryMenuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-midasbuy-navy border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-midasbuy-navy border-b border-gray-700 p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-bold">COUNTRY/REGION</h3>
                <button 
                  onClick={() => setIsCountryMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full bg-midasbuy-darkBlue/70 text-white border border-gray-700 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-midasbuy-blue"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="p-2">
              {Object.entries(groupedCountries).map(([region, countries]) => (
                <div key={region} className="mb-4">
                  <h4 className="text-gray-400 text-sm font-medium mb-2 px-2">{region}</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        className={cn(
                          "flex items-center p-2 rounded-md text-left",
                          currentCountry.code === country.code 
                            ? "bg-midasbuy-blue text-white" 
                            : "text-gray-300 hover:bg-gray-700/40"
                        )}
                        onClick={() => handleSelectCountry(country)}
                      >
                        <img 
                          src={`https://flagcdn.com/w20/${country.code}.png`} 
                          alt={country.name} 
                          className="w-5 h-4 mr-2" 
                        />
                        <span className="flex-1">{country.name}</span>
                        <span className="text-xs opacity-70">{country.currency}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredCountries.length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  No countries found matching "{searchQuery}"
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 bg-midasbuy-navy border-t border-gray-700 p-3">
              <button 
                className="w-full bg-midasbuy-blue text-white py-2 rounded-md"
                onClick={() => setIsCountryMenuOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
