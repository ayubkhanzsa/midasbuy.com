
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
      case 'visa': return 'Visa Gold';
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
        {/* Card type and logo in top right */}
        <div className="w-full flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-white/90">
              {getCardTypeLabel(cardType)}
            </div>
          </div>
          
          {/* Visa Gold logo in top right for Visa cards */}
          {cardType === 'visa' && (
            <div className="flex flex-col items-end">
              <div className="text-white text-lg font-bold italic uppercase flex items-center">
                <span className="text-white">VISA</span>
                <span className="text-xs ml-1 text-yellow-400/90">Gold</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Card number - Moved back to top */}
        <div className="w-full mt-2" onClick={toggleCardNumberVisibility}>
          <div className="text-lg md:text-xl font-mono tracking-widest cursor-pointer text-yellow-400 font-semibold">
            {displayNumber}
          </div>
          <div className="text-[8px] mt-0.5 text-white/70">
            {isCardNumberHidden ? "Tap to show" : "Tap to hide"}
          </div>
        </div>
        
        {/* Cardholder info and expiry - Moved below card number */}
        <div className="w-full mt-2">
          <div className="flex">
            <div className="w-1/2">
              <div className="text-[8px] text-white/70 uppercase tracking-wider">Card Holder</div>
              <div className="text-xs font-medium uppercase tracking-wider text-yellow-400/90 font-semibold truncate">
                {cardholderName || 'YOUR NAME'}
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-[8px] text-white/70 uppercase tracking-wider">
                CARD EXPIRY
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-yellow-400/90 font-semibold">
                {expiryDate || 'MM/YY'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
