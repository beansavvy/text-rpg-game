import React, { useEffect, useState } from 'react';
import Dialogue from '@components/main_game_sections/dialogue';
import Log from '@components/main_game_sections/log';
import Menu from './main_game_sections/menu';
import Combat from '@components/main_game_sections/combat';
import NPCDisplay from '@components/main_game_sections/npcDisplay';
import { LogProvider } from '@context/LogContext'; // Adjust the import path accordingly
import { useGameContext } from '../context/GameContext';
import MenuPopup, { type MenuTab } from './main_game_sections/menuPopup';

const MainGame = () => {
  const { combatActive, npcActive } = useGameContext();
  // const { combatActive } = state;

  // console.log('COMBAT ACTIVE? ' + combatActive);

  const [showDialogue, setShowDialogue] = useState(true);

  const [activeMenu, setActiveMenu] = useState<MenuTab | null>(null);

  const handleMenuClick = (tab: MenuTab) => {
    setActiveMenu((current) => (current === tab ? null : tab));
  };

  useEffect(() => {
    // console.log('UPDATE MAIN GAME FILE: ' + combatActive);
    let timer: NodeJS.Timeout;
    if (combatActive == 0) {
      timer = setTimeout(() => setShowDialogue(true), 1000); // 1 second delay
    } else if (combatActive == 2) {
      setShowDialogue(true);
    } else {
      setShowDialogue(false);
    }
    return () => clearTimeout(timer);
  }, [combatActive]);

  // console.log('CURRENT NPC STATE: ', npcActive);

  return (
    <LogProvider>
      <MenuPopup activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
      <div className="main-game-container">
        <div className="left-panel">
          {npcActive == null ? (
            !showDialogue ? (
              <Combat />
            ) : (
              <Dialogue />
            )
          ) : (
            <NPCDisplay />
          )}
        </div>
        <div className="right-panel">
          <Log />
        </div>
        <div className="right-panel">
          <Menu activeMenu={activeMenu} onMenuClick={handleMenuClick} />
        </div>
      </div>
    </LogProvider>
  );
};

export default MainGame;
