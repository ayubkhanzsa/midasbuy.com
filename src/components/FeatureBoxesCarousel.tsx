
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureBoxesCarouselProps {
  className?: string;
}

const FeatureBoxesCarousel: React.FC<FeatureBoxesCarouselProps> = ({ className }) => {
  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl text-white font-bold mb-6">MIDASBUY CAN OFFER YOU</h3>
    </div>
  );
};

export default FeatureBoxesCarousel;
