import React, { createContext, useContext, useEffect, useState } from 'react';

interface MotionContextType {
  prefersReducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (enabled: boolean) => void;
  systemPrefersReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  prefersReducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {},
  systemPrefersReducedMotion: false,
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemPreference, setSystemPreference] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [userOverride, setUserOverride] = useState<boolean | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jjj_reduced_motion_preference');
      if (stored !== null) return stored === 'true';
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemPreference(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const prefersReducedMotion = userOverride !== null ? userOverride : systemPreference;

  const toggleReducedMotion = () => {
    setUserOverride(prev => {
      const next = prev !== null ? !prev : !systemPreference;
      if (typeof window !== 'undefined') {
        localStorage.setItem('jjj_reduced_motion_preference', String(next));
      }
      return next;
    });
  };

  const setReducedMotion = (enabled: boolean) => {
    setUserOverride(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jjj_reduced_motion_preference', String(enabled));
    }
  };

  return (
    <MotionContext.Provider
      value={{
        prefersReducedMotion,
        toggleReducedMotion,
        setReducedMotion,
        systemPrefersReducedMotion: systemPreference,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useReducedMotion = (): MotionContextType => {
  return useContext(MotionContext);
};
