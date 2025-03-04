
// Exchange rates relative to USD (simplified for demonstration)
// In a production app, you would fetch real-time exchange rates from an API
const exchangeRates: Record<string, number> = {
  USD: 1.00,    // US Dollar (base currency)
  EUR: 0.92,    // Euro
  CAD: 1.36,    // Canadian Dollar
  GBP: 0.81,    // British Pound
  AUD: 1.52,    // Australian Dollar
  BRL: 5.48,    // Brazilian Real
  CLP: 922.77,  // Chilean Peso
  COP: 4119.73, // Colombian Peso
  MXN: 17.02,   // Mexican Peso
  PEN: 3.72,    // Peruvian Sol
  UAH: 39.56,   // Ukrainian Hryvnia
  TRY: 32.96,   // Turkish Lira
  AMD: 388.95,  // Armenian Dram
  BDT: 109.91,  // Bangladeshi Taka
  BTN: 83.48,   // Bhutanese Ngultrum
  KHR: 4090.90, // Cambodian Riel
  HKD: 7.81,    // Hong Kong Dollar
  IDR: 15681.82, // Indonesian Rupiah
  KZT: 448.98,  // Kazakhstani Tenge
  KGS: 89.11,   // Kyrgystani Som
  LAK: 20613.60, // Lao Kip
  MYR: 4.65,    // Malaysian Ringgit
  MMK: 2097.35, // Myanmar Kyat
  MOP: 8.04,    // Macanese Pataca
  MNT: 3453.17, // Mongolian Tugrik
  MVR: 15.45,   // Maldivian Rufiyaa
  NZD: 1.65,    // New Zealand Dollar
  PKR: 278.55,  // Pakistani Rupee
  PHP: 56.63,   // Philippine Peso
  SGD: 1.35,    // Singapore Dollar
  KRW: 1360.54, // South Korean Won
  LKR: 314.26,  // Sri Lankan Rupee
  TWD: 32.16,   // New Taiwan Dollar
  THB: 36.28,   // Thai Baht
  VND: 25235.20, // Vietnamese Dong
};

// Currency display options
const currencyFormatters: Record<string, Intl.NumberFormat> = {};

// Get or create formatter for a currency
const getFormatter = (currency: string): Intl.NumberFormat => {
  if (!currencyFormatters[currency]) {
    currencyFormatters[currency] = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return currencyFormatters[currency];
};

// Convert price from USD to target currency
export const convertPrice = (priceUSD: number, targetCurrency: string): number => {
  const rate = exchangeRates[targetCurrency] || 1;
  return priceUSD * rate;
};

// Format price in the target currency
export const formatPrice = (price: number, currency: string): string => {
  try {
    return getFormatter(currency).format(price);
  } catch (error) {
    console.error(`Error formatting price for currency ${currency}:`, error);
    return `${price.toFixed(2)} ${currency}`;
  }
};

// Full function to convert and format price
export const convertAndFormatPrice = (priceUSD: number, targetCurrency: string): string => {
  const convertedPrice = convertPrice(priceUSD, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency);
};

// Function to create a custom event for currency changes
export const triggerCurrencyChangeEvent = (currency: string) => {
  const event = new CustomEvent('currencyChange', { 
    detail: { currency },
    bubbles: true 
  });
  window.dispatchEvent(event);
};

// Listen for currency changes
export const setupCurrencyChangeListener = (callback: (currency: string) => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{currency: string}>;
    callback(customEvent.detail.currency);
  };
  
  window.addEventListener('currencyChange', handler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('currencyChange', handler);
  };
};
