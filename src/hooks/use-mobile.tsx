
import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial value
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return mounted ? isMobile : false;
}

// Custom hook to detect if the device is a tablet
export function useTablet(minBreakpoint = 768, maxBreakpoint = 1024): boolean {
  const [isTablet, setIsTablet] = useState<boolean>(
    typeof window !== 'undefined' 
      ? window.innerWidth >= minBreakpoint && window.innerWidth < maxBreakpoint 
      : false
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsTablet(window.innerWidth >= minBreakpoint && window.innerWidth < maxBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial value
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [minBreakpoint, maxBreakpoint]);

  return mounted ? isTablet : false;
}

// Custom hook for responsive design with improved detection
export function useResponsive(): { 
  isMobile: boolean; 
  isTablet: boolean; 
  isDesktop: boolean 
} {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mounted ? screenSize : { isMobile: false, isTablet: false, isDesktop: true };
}

// Custom hook for triggering animations with different durations
export function useAnimationDuration(type: 'slow' | 'medium' | 'fast' = 'medium'): number {
  const durations = {
    slow: 16, // Slower animation (was 8)
    medium: 5,
    fast: 2
  };
  
  return durations[type];
}
