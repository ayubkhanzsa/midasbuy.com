
import React, { useState } from 'react';
import { CardType, detectCardType, getCardGradient, getCardLogo, getChipImage } from '@/utils/cardUtils';

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
    <div className={`relative w-full aspect-[1.6/1] max-w-[300px] rounded-xl overflow-hidden bg-gradient-to-br ${getCardGradient(cardType)} p-5 shadow-xl text-white`}>
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
        {/* Card type and chip */}
        <div className="w-full flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-white/90">
              {getCardTypeLabel(cardType)}
            </div>
            
            {/* Chip image replacing the old icons */}
            <div className="mt-2">
              <img 
                src={getChipImage()} 
                alt="Card Chip" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Card number - Moved up slightly */}
        <div className="w-full mt-1" onClick={toggleCardNumberVisibility}>
          <div className="text-lg font-mono tracking-widest cursor-pointer text-yellow-400 font-semibold">
            {displayNumber}
          </div>
          <div className="text-[8px] mt-0.5 text-white/70">
            {isCardNumberHidden ? "Tap to show" : "Tap to hide"}
          </div>
        </div>
        
        {/* Cardholder info and expiry - Made smaller and more professional */}
        <div className="w-full mt-auto mb-6 flex flex-col gap-1">
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
        
        {/* Card brand logo with your custom chip logo */}
        <div className="absolute bottom-2 right-2">
          {cardType === 'visa' && (
            <div className="flex flex-col items-end">
              <div className="text-white text-2xl font-bold italic uppercase flex items-center">
                <span className="text-white">VISA</span>
                <span className="text-[10px] ml-1 text-yellow-400/90">Gold</span>
              </div>
              <img 
                src={getCardLogo(cardType)} 
                alt="Card Logo" 
                className="h-6 w-auto mt-1"
              />
            </div>
          )}
          {cardType === 'mastercard' && (
            <div className="flex flex-col items-end space-y-1">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 opacity-80 -ml-4"></div>
              </div>
              <img 
                src={getCardLogo(cardType)} 
                alt="Card Logo" 
                className="h-6 w-auto"
              />
            </div>
          )}
          {(cardType !== 'visa' && cardType !== 'mastercard') && (
            <div className="flex flex-col items-end space-y-1">
              <div className="text-white text-lg font-bold opacity-80">
                {cardType.toUpperCase()}
              </div>
              <img 
                src={getCardLogo(cardType)} 
                alt="Card Logo" 
                className="h-6 w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
