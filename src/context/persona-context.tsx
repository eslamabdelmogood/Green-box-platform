'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import type { PersonaData } from '@/lib/types';
import { personaData } from '@/lib/data';

export type PersonaType = 'Port' | 'Airport' | 'Factory' | 'Vessel';

type PersonaContextType = {
  personaType: PersonaType;
  setPersonaType: (type: PersonaType) => void;
  persona: PersonaData;
};

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [personaType, setPersonaType] = useState<PersonaType>('Port');

  const persona = useMemo(() => {
    const data = personaData[personaType];
    return { ...data, type: personaType };
  }, [personaType]);

  const value = {
    personaType,
    setPersonaType,
    persona,
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}
