'use client';

import { useState } from 'react';
import StartPage from '../components/startPage';
import CreateCharacter from '../components/createCharacter';
import Dialogue from '../components/dialogue';
import Log from '../components/log';
import Menu from '../components/menu';
import ScrollingPaperText from '../components/scrollingPaperText'; // Adjust the import path if needed
import { db, createCharacter } from '../data/data';
import '../styles/globalStyles.css';

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [scrollingTextIndex, setScrollingTextIndex] = useState(0);
  const [character, setCharacter] = useState<any>(null);

  const goToNextPage = (index: number, createdCharacter: any) => {
    setScrollingTextIndex(index);
    setCharacter(createdCharacter);
    setCurrentPage('scrollingText');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'createCharacter':
        return <CreateCharacter goToNextPage={goToNextPage} />;
      case 'scrollingText':
        const generatedText = db.scrollingTexts[scrollingTextIndex](character);
        // console.log(generatedText);
        return (
          <ScrollingPaperText
            key="scrolling-text"
            text={generatedText}
            onComplete={() => setCurrentPage('mainGame')}
          />
        );
      case 'mainGame':
        return (
          <div className="main-game-container">
            <div className="left-panel">
              <Dialogue />
            </div>
            <div className="middle-panel">
              <Log />
            </div>
            <div className="right-panel">
              <Menu setCurrentPage={setCurrentPage} />
            </div>
          </div>
        );
      default:
        return (
          <StartPage
            goToCreateCharacter={() => setCurrentPage('createCharacter')}
          />
        );
    }
  };

  return <main>{renderCurrentPage()}</main>;
};

export default Page;
