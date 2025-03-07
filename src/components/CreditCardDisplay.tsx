
import React, { useState } from 'react';
import { CardType, detectCardType, getCardGradient, getCardLogo, getChipImage } from '@/utils/cardUtils';
import { EyeOff, Eye } from 'lucide-react';

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
    <div className="relative w-full aspect-[1.6/1] max-w-[420px] mx-auto rounded-xl overflow-hidden bg-gradient-to-br shadow-xl text-white">
      {/* Card background with gradient based on card type */}
      <div className={`absolute inset-0 ${getCardGradient(cardType)}`}></div>
      
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
      
      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        {/* Top row with card type and logo */}
        <div className="flex justify-between items-start w-full">
          <div>
            <div className="text-xl font-bold text-white/90">
              {getCardTypeLabel(cardType)}
            </div>
          </div>
          
          {/* Card brand logo */}
          <div className="flex items-center h-8">
            {cardType === 'visa' ? (
              <div className="text-white text-lg font-bold italic uppercase flex items-center">
                <span className="text-white">VISA</span>
                <span className="text-[10px] ml-1 text-yellow-400/90">Gold</span>
              </div>
            ) : (
              <img src={getCardLogo(cardType)} alt={cardType} className="h-8 object-contain" />
            )}
          </div>
        </div>
        
        {/* Chip image */}
        <div className="mt-2 mb-3">
          <img src={getChipImage()} alt="Chip" className="h-10 w-14 object-contain" />
        </div>
        
        {/* Card number with toggle visibility */}
        <div 
          className="cursor-pointer group transition-all duration-300 py-2 select-none"
          onClick={toggleCardNumberVisibility}
        >
          <div className="text-xl font-mono tracking-widest text-white">
            {displayNumber}
          </div>
          <div className="mt-1 text-[10px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
            {isCardNumberHidden ? "Tap to show" : "Tap to hide"}
          </div>
        </div>
        
        {/* Card holder details */}
        <div className="mt-auto grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-white/70 uppercase tracking-wider">Card Holder</div>
            <div className="text-sm font-medium uppercase tracking-wider truncate mt-1 text-white">
              {cardholderName || 'YOUR NAME'}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] text-white/70 uppercase tracking-wider">
              Expires
            </div>
            <div className="text-sm font-medium uppercase tracking-wider mt-1 text-white">
              {expiryDate || 'MM/YY'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
