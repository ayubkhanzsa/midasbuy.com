
import React from 'react';
import { CardType, detectCardType, getCardGradient, getCardLogo } from '@/utils/cardUtils';

interface CreditCardDisplayProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
}

const CreditCardDisplay = ({ cardNumber, cardholderName, expiryDate }: CreditCardDisplayProps) => {
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

export default CreditCardDisplay;
