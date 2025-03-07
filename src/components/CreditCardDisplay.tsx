
import React, { useState } from 'react';
import { CardType, detectCardType, getCardGradient, getCardLogo } from '@/utils/cardUtils';

interface CreditCardDisplayProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
}

const CreditCardDisplay = ({ cardNumber, cardholderName, expiryDate }: CreditCardDisplayProps) => {
  const [isCardNumberHidden, setIsCardNumberHidden] = useState(false);
  const cardType = detectCardType(cardNumber);
  const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
  
  // Display full card number or masked version
  const displayNumber = isCardNumberHidden 
    ? `•••• •••• •••• ${last4}` 
    : cardNumber || '•••• •••• •••• ••••';
  
  const toggleCardNumberVisibility = () => {
    setIsCardNumberHidden(!isCardNumberHidden);
  };
  
  return (
    <div className={`relative w-full aspect-[1.6/1] max-w-xs rounded-xl overflow-hidden bg-gradient-to-br ${getCardGradient(cardType)} p-5 shadow-xl text-white`}>
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
      </div>
      
      <div className="flex justify-between items-start h-full flex-col relative z-10">
        <div className="w-full flex justify-between items-center">
          <div className="w-20 h-12 relative flex items-center">
            <img 
              src={getCardLogo(cardType)} 
              alt={`${cardType} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="text-right">
            <div className="text-xs opacity-70 font-medium">Credit Card</div>
          </div>
        </div>
        
        <div className="w-full mt-4" onClick={toggleCardNumberVisibility}>
          <div className="text-lg font-mono tracking-wider cursor-pointer">
            {displayNumber}
          </div>
          <div className="text-xs mt-1 opacity-70">
            {isCardNumberHidden ? "Tap to show" : "Tap to hide"}
          </div>
        </div>
        
        <div className="w-full mt-auto grid grid-cols-2 gap-2">
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
        
        <div className="absolute bottom-0 right-0 mr-5 mb-5">
          {cardType === 'visa' && (
            <svg viewBox="0 0 48 16" height="16" width="48" preserveAspectRatio="xMidYMid meet" className="opacity-80">
              <path d="M44 0H4C1.8 0 0 1.8 0 4v8c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4z" fill="none" stroke="white" strokeOpacity="0.4" />
              <path d="M15.24 15.206H12L14.1 0.794h3.24L15.24 15.206zM33.6 1.03c-.66-.26-1.68-.54-2.94-.54-3.24 0-5.52 1.7-5.54 4.14-.02 1.8 1.64 2.8 2.88 3.4 1.26.62 1.7 1.02 1.7 1.56-.02.84-1.02 1.22-1.96 1.22-1.32 0-2.02-.2-3.08-.66l-.44-.2-.46 2.8c.76.34 2.16.64 3.62.66 3.42 0 5.64-1.68 5.66-4.28.02-1.42-.86-2.5-2.74-3.4-1.14-.56-1.84-.94-1.84-1.52 0-.52.58-1.06 1.86-1.06 1.06-.02 1.84.22 2.44.48l.28.14.44-2.74M39.5 10.17c.26-.7 1.28-3.42 1.28-3.42-.02.04.26-.7.42-1.16l.22 1.06s.62 2.88.74 3.52h-2.66zm4.02-9.38h-2.5c-.78 0-1.36.22-1.7 1.02L33.5 15.2h3.42l.82-2.24h5.02c.12.52.48 2.24.48 2.24h3.02L39.52.79zM11.02 8.17L10.5 5.4c-.96-3.22-3.9-6.7-7.2-8.44l2.94 14.22h3.46L15.96.8H12.5l-1.48 7.38z" fill="white" />
              <path d="M5.34.79H.06L0 1.06c4.14.98 6.88 3.38 8.02 6.26L6.86 1.82c-.2-.82-.82-1-1.52-1.04z" fill="white" />
            </svg>
          )}
          {cardType === 'mastercard' && (
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-400 opacity-80 -ml-4"></div>
            </div>
          )}
          {cardType === 'amex' && (
            <div className="text-white text-lg font-bold opacity-80">AMEX</div>
          )}
          {cardType === 'discover' && (
            <div className="text-white text-lg font-bold opacity-80">DISCOVER</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
