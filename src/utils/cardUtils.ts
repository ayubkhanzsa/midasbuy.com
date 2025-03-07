
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'dinersclub' | 'unknown';

// Function to detect card type based on card number
export const detectCardType = (cardNumber: string): CardType => {
  const cleanNumber = cardNumber.replace(/\s+/g, '');
  
  // Full pattern matching for complete numbers
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanNumber)) {
    return 'visa';
  }
  
  if (/^5[1-5][0-9]{14}$/.test(cleanNumber) || /^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/.test(cleanNumber)) {
    return 'mastercard';
  }
  
  if (/^3[47][0-9]{13}$/.test(cleanNumber)) {
    return 'amex';
  }
  
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cleanNumber)) {
    return 'discover';
  }
  
  if (/^(?:2131|1800|35\d{3})\d{11}$/.test(cleanNumber)) {
    return 'jcb';
  }
  
  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cleanNumber)) {
    return 'dinersclub';
  }
  
  // Prefix-based detection for partial numbers
  if (cleanNumber.startsWith('4')) {
    return 'visa';
  }
  
  if (cleanNumber.startsWith('5') || 
      (cleanNumber.startsWith('2') && parseInt(cleanNumber.substr(1, 1), 10) >= 2 && parseInt(cleanNumber.substr(1, 1), 10) <= 7)) {
    return 'mastercard';
  }
  
  if (cleanNumber.startsWith('3') && (cleanNumber.substr(1, 1) === '4' || cleanNumber.substr(1, 1) === '7')) {
    return 'amex';
  }
  
  if (cleanNumber.startsWith('6')) {
    return 'discover';
  }
  
  return 'unknown';
};

// Function to get card logo
export const getCardLogo = (cardType: CardType): string => {
  switch (cardType) {
    case 'visa':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'mastercard':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'amex':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'discover':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'jcb':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'dinersclub':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    default:
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
  }
};

// Helper function to get card background gradient
export const getCardGradient = (cardType: CardType): string => {
  switch (cardType) {
    case 'visa':
      return 'from-blue-600 to-blue-800';
    case 'mastercard':
      return 'from-red-600 to-orange-500';
    case 'amex':
      return 'from-blue-500 to-blue-700';
    case 'discover':
      return 'from-orange-500 to-orange-700';
    case 'jcb':
      return 'from-green-600 to-green-800';
    case 'dinersclub':
      return 'from-gray-700 to-gray-900';
    default:
      return 'from-gray-800 to-slate-900';
  }
};
