
import React from 'react';
import Header from "@/components/Header";

interface HelpCenterPageProps {
  onLogout: () => void;
}

export const HelpCenterPage = ({ onLogout }: HelpCenterPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-midasbuy-navy to-black text-white">
      <Header onLogout={onLogout} />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>
        <p className="text-center mb-8">This page is under construction.</p>
      </div>
    </div>
  );
};

export default HelpCenterPage;
