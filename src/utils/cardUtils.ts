
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'dinersclub' | 'unknown';

// Function to detect card type based on card number
export const detectCardType = (cardNumber: string): CardType => {
  const cleanNumber = cardNumber.replace(/\s+/g, '');
  
  // Visa
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanNumber)) {
    return 'visa';
  }
  
  // Mastercard
  if (/^5[1-5][0-9]{14}$/.test(cleanNumber) || /^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/.test(cleanNumber)) {
    return 'mastercard';
  }
  
  // American Express
  if (/^3[47][0-9]{13}$/.test(cleanNumber)) {
    return 'amex';
  }
  
  // Discover
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cleanNumber)) {
    return 'discover';
  }
  
  // JCB
  if (/^(?:2131|1800|35\d{3})\d{11}$/.test(cleanNumber)) {
    return 'jcb';
  }
  
  // Diners Club
  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cleanNumber)) {
    return 'dinersclub';
  }
  
  // Detect card type based on starting digits for partial numbers
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

// Function to get card image path based on card type
export const getCardImagePath = (cardType: CardType): string => {
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

// Credit card component that displays a professional looking card
export const CreditCardDisplay = ({ cardNumber, cardholderName, expiryDate }: { 
  cardNumber: string, 
  cardholderName: string, 
  expiryDate: string 
}) => {
  const cardType = detectCardType(cardNumber);
  const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
  const displayNumber = last4 ? `•••• •••• •••• ${last4}` : '•••• •••• •••• ••••';
  
  return (
    <div className={`relative w-full aspect-[1.6/1] max-w-md rounded-xl overflow-hidden bg-gradient-to-br ${getCardGradient(cardType)} p-5 shadow-lg text-white`}>
      <div className="flex justify-between items-start h-full flex-col">
        <div className="w-full flex justify-between items-center">
          <div className="w-12 h-12 relative">
            <img 
              src={getCardLogo(cardType)} 
              alt={`${cardType} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-right">
            <div className="text-xs opacity-70">Credit Card</div>
          </div>
        </div>
        
        <div className="w-full mt-4">
          <div className="text-lg sm:text-xl font-mono tracking-wider">
            {displayNumber}
          </div>
        </div>
        
        <div className="w-full mt-auto grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs opacity-70">Card Holder</div>
            <div className="text-sm font-medium truncate">
              {cardholderName || 'YOUR NAME'}
            </div>
          </div>
          <div>
            <div className="text-xs opacity-70">Expires</div>
            <div className="text-sm font-medium">
              {expiryDate || 'MM/YY'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get card logo
const getCardLogo = (cardType: CardType): string => {
  switch (cardType) {
    case 'visa':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'mastercard':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'amex':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    case 'discover':
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
    default:
      return '/lovable-uploads/83bab1f5-3ee2-4dd1-ab6e-7baab1fa72d1.png';
  }
};

// Helper function to get card background gradient
const getCardGradient = (cardType: CardType): string => {
  switch (cardType) {
    case 'visa':
      return 'from-blue-700 to-blue-900';
    case 'mastercard':
      return 'from-orange-600 to-red-700';
    case 'amex':
      return 'from-blue-400 to-blue-600';
    case 'discover':
      return 'from-orange-400 to-orange-600';
    case 'jcb':
      return 'from-green-500 to-green-700';
    case 'dinersclub':
      return 'from-gray-600 to-gray-800';
    default:
      return 'from-gray-700 to-gray-900';
  }
};
