'use client';

import { GameProvider, useGameContext } from '../context/GameContext'; // Adjust the import path accordingly
import CreateCharacter from '../components/createCharacter';
import StartPage from '../components/startPage'; // Adjust the import path accordingly
import MainGame from '../components/mainGame'; // Adjust the import path accordingly
import LoadingPage from '@components/loading';
import '../styles/globalStyles.css';

const App = () => {
  return (
    <GameProvider>
      <Page />
    </GameProvider>
  );
};

const Page = () => {
  const { currentScreen, loading } = useGameContext();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {currentScreen === 'startPage' ? (
        <StartPage />
      ) : currentScreen === 'createCharacter' ? (
        <CreateCharacter />
      ) : currentScreen === 'mainGame' ? (
        <MainGame />
      ) : (
        ''
      )}
      {/* Render other components based on gameState */}
    </>
  );
};

export default App;
