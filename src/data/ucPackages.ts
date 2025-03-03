
export interface UCPackage {
  id: string;
  baseAmount: number;
  bonusAmount: number;
  discount: string;
  price: number;
  originalPrice: number;
  bonusPercent: string;
  image: string;
}

export const ucPackages: UCPackage[] = [
  {
    id: "60uc",
    baseAmount: 60,
    bonusAmount: 0,
    discount: "-10.1%",
    price: 0.89,
    originalPrice: 0.99,
    bonusPercent: "",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "300uc",
    baseAmount: 300,
    bonusAmount: 25,
    discount: "-10.02%",
    price: 4.49,
    originalPrice: 4.99,
    bonusPercent: "8%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "600uc",
    baseAmount: 600,
    bonusAmount: 60,
    discount: "-10.01%",
    price: 8.99,
    originalPrice: 9.99,
    bonusPercent: "10%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "1500uc",
    baseAmount: 1500,
    bonusAmount: 300,
    discount: "-10%",
    price: 22.49,
    originalPrice: 24.99,
    bonusPercent: "20%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "3000uc",
    baseAmount: 3000,
    bonusAmount: 850,
    discount: "-10%",
    price: 44.99,
    originalPrice: 49.99,
    bonusPercent: "28%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "6000uc",
    baseAmount: 6000,
    bonusAmount: 2100,
    discount: "-10%",
    price: 89.99,
    originalPrice: 99.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "12000uc",
    baseAmount: 12000,
    bonusAmount: 4200,
    discount: "-10%",
    price: 179.99,
    originalPrice: 199.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "18000uc",
    baseAmount: 18000,
    bonusAmount: 6300,
    discount: "-10%",
    price: 269.99,
    originalPrice: 299.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "24000uc",
    baseAmount: 24000,
    bonusAmount: 8400,
    discount: "-10%",
    price: 359.99,
    originalPrice: 399.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "30000uc",
    baseAmount: 30000,
    bonusAmount: 10500,
    discount: "-10%",
    price: 449.99,
    originalPrice: 499.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  },
  {
    id: "60000uc",
    baseAmount: 60000,
    bonusAmount: 21000,
    discount: "-10%",
    price: 899.99,
    originalPrice: 999.99,
    bonusPercent: "35%",
    image: "/lovable-uploads/d85f0290-d064-4c3e-a4a6-54a10fdad769.png"
  }
];

export const getPackageById = (id: string): UCPackage | undefined => {
  return ucPackages.find(pkg => pkg.id === id);
};
