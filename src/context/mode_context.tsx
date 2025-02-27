'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Mode } from '@/types/mode';

interface ModeContextProps {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextProps>({
  mode: Mode.NORMAL,
  toggleMode: () => {},
  setMode: () => {},
});

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Mode>(Mode.NORMAL);

  useEffect(() => {
    const storedMode = (localStorage.getItem('mode') as Mode) || Mode.NORMAL;
    setMode(storedMode);
  }, []);

  const toggleMode = () => {
    const newMode = mode === Mode.ROAST ? Mode.NORMAL : Mode.ROAST;
    localStorage.setItem('mode', newMode);
    setMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
