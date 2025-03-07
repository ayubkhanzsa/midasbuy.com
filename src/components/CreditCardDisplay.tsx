
import React, { useState } from 'react';
import { CardType, detectCardType, getCardGradient, getCardLogo, getChipImage } from '@/utils/cardUtils';
import { useTablet } from '@/hooks/use-mobile';

interface CreditCardDisplayProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
}

const CreditCardDisplay = ({ cardNumber, cardholderName, expiryDate }: CreditCardDisplayProps) => {
  const [isCardNumberHidden, setIsCardNumberHidden] = useState(false);
  const cardType = detectCardType(cardNumber);
  const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
  const isTablet = useTablet();
  
  // Display full card number or masked version
  const displayNumber = isCardNumberHidden 
    ? `•••• •••• •••• ${last4}` 
    : cardNumber || '•••• •••• •••• ••••';
  
  const toggleCardNumberVisibility = () => {
    setIsCardNumberHidden(!isCardNumberHidden);
  };
  
  const getCardTypeLabel = (type: CardType): string => {
    switch(type) {
      case 'visa': return 'Visa Card';
      case 'mastercard': return 'Mastercard';
      case 'amex': return 'American Express';
      case 'discover': return 'Discover';
      case 'jcb': return 'JCB';
      case 'dinersclub': return 'Diners Club';
      default: return 'Credit Card';
    }
  };
  
  return (
    <div className={`relative w-full aspect-[1.6/1] ${isTablet ? 'max-w-[280px]' : 'max-w-[320px]'} mx-auto rounded-xl overflow-hidden bg-gradient-to-br ${getCardGradient(cardType)} p-5 shadow-xl text-white`}>
      {/* Card background pattern */}
      <div className="absolute inset-0 opacity-10">
        {cardType === 'visa' && (
          <div className="absolute inset-0">
            {/* Diagonal lines pattern for Visa */}
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 1px, transparent 1px, transparent 6px)'
            }}></div>
          </div>
        )}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
      </div>
      
      <div className="flex justify-between items-start h-full flex-col relative z-10">
        {/* Top section with card type text and contactless icon */}
        <div className="w-full flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-white/90">
              {getCardTypeLabel(cardType)}
            </div>
          </div>
          
          {/* Move card brand logo to the top right */}
          <div className="flex items-center">
            {cardType === 'mastercard' && (
              <div className="flex">
                <div className="w-7 h-7 rounded-full bg-red-600 opacity-90 -mr-2"></div>
                <div className="w-7 h-7 rounded-full bg-yellow-500 opacity-90"></div>
              </div>
            )}
            {cardType === 'visa' && (
              <div className="text-white text-lg font-bold italic uppercase">
                VISA
              </div>
            )}
            {(cardType !== 'mastercard' && cardType !== 'visa') && (
              <div className="text-white text-lg font-bold uppercase">
                {cardType}
              </div>
            )}
            
            {/* Contactless payment icon next to the logo */}
            <div className="flex ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M8.7 10a2 2 0 0 0-3.4 0"></path>
                <path d="M7 13.5a5 5 0 0 0-7 0"></path>
                <path d="M11.33 10a2 2 0 0 0-3.4 0"></path>
                <path d="M9.63 13.5a5 5 0 0 0-7 0"></path>
                <path d="M14 10a2 2 0 0 0-3.4 0"></path>
                <path d="M12.3 13.5a5 5 0 0 0-7 0"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Chip image on left side */}
        <div className="w-full flex mt-2">
          <div className="bg-gray-200 rounded-md w-10 h-8 overflow-hidden">
            <img 
              src="/lovable-uploads/7366e17c-7ac1-4280-975f-ee7c317f2afe.png" 
              alt="Chip" 
              className="h-full w-full object-cover opacity-0"
            />
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-[1px] w-8 h-6">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-400/50 h-full w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Card number in the middle */}
        <div className="w-full mt-auto mb-auto" onClick={toggleCardNumberVisibility}>
          <div className="text-base md:text-lg font-mono tracking-widest cursor-pointer text-white font-medium">
            {displayNumber}
          </div>
          <div className="text-[8px] mt-0.5 text-white/70">
            {isCardNumberHidden ? "Tap to show" : "Tap to hide"}
          </div>
        </div>
        
        {/* Bottom section with expiry date and cardholder name */}
        <div className="w-full mt-auto flex flex-col">
          <div className="flex text-xs">
            <div>
              <div className="text-[8px] text-white/70 uppercase tracking-wider">VALID THRU</div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/90">
                {expiryDate || 'MM/YY'}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-1">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-white/90 truncate max-w-[140px]">
                {cardholderName || 'CARDHOLDER NAME'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
