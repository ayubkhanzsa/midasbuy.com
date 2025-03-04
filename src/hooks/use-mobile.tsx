
import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial value
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

// Custom hook to detect if the device is a tablet
export function useTablet(minBreakpoint = 768, maxBreakpoint = 1024): boolean {
  const [isTablet, setIsTablet] = useState<boolean>(
    typeof window !== 'undefined' 
      ? window.innerWidth >= minBreakpoint && window.innerWidth < maxBreakpoint 
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= minBreakpoint && window.innerWidth < maxBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial value
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [minBreakpoint, maxBreakpoint]);

  return isTablet;
}

// Custom hook for responsive design
export function useResponsive(): { 
  isMobile: boolean; 
  isTablet: boolean; 
  isDesktop: boolean 
} {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isDesktop = !isMobile && !isTablet;

  return { isMobile, isTablet, isDesktop };
}
