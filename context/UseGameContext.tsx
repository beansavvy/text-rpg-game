// hooks/useGameContext.ts
import { useContext } from 'react';
import { GameContext } from '@context/GameContext';

const useGameContextValues = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContextValues must be used within a GameProvider');
  }
  return context;
};

export default useGameContextValues;
