import React, { useState, useEffect } from 'react'; //updated code
import { useGameContext } from '@context/GameContext';
// import { db } from '@data/data';
import CombatSkillMenu from '@components/main_game_sections/combat_menu_sections/combatSkills';
import Tooltip from '@components/tooltip';
import CombatGrid from '@components/main_game_sections/combat_menu_sections/combatGrid';
// import { getLocationById } from '@data/data';

const Combat = () => {
  //updated code
  const { updateCombatActive, db, enemy, setNewCurrentLocation, party } =
    useGameContext(); //updated code
  const [currentTabContent, setCurrentTabContent] = useState('');
  const [currTab, setCurrTab] = useState('');
  const player = db.characters[0];
  const [turnOrder, setTurnOrder] = useState([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  useEffect(() => {
    // Initialize turn order with players and enemies
    const players = db.characters.map((char) => ({
      type: 'player',
      id: char.id,
    }));
    const enemies = [{ type: 'enemy', id: enemy.id }];
    setTurnOrder([...players, ...enemies]);
  }, [db.characters, enemy]);

  const nextTurn = () => {
    setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % turnOrder.length);
  };

  const handleFlee = () => {
    updateCombatActive(2);
  };

  const handleMenuClick = (tabName) => {
    if (currTab == tabName) {
      setCurrentTabContent('');
      setCurrTab('');
      return;
    }
    switch (tabName) {
      case 'skills':
        setCurrentTabContent(<CombatSkillMenu />);
        break;
      case 'consumables':
        setCurrentTabContent('Consumable content goes here');
        break;
      case 'etc':
        setCurrentTabContent(<button onClick={() => handleFlee}>Flee</button>);
        break;
    }
    setCurrTab(tabName);
  };

  return (
    <div className="combat-container">
      <div className="turn-indicator">
        <h3>Turn Order:</h3>
        <ul>
          {turnOrder.map((turn, index) => (
            <li
              key={turn.id}
              className={index === currentTurnIndex ? 'current-turn' : ''}
            >
              {turn.type === 'player'
                ? `Player ${turn.id}`
                : `Enemy ${turn.id}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="enemy-section">
        <div className="enemy-name-wrapper">
          <Tooltip enemy={enemy}>
            <h2 className="enemy-name">{enemy.name}</h2> {/* updated code */}
          </Tooltip>
        </div>
        <div className="enemy-health-bar">
          <div
            className="fill"
            style={{
              width: `${(enemy.health.current / enemy.health.max) * 100}%`,
            }}
          ></div>
          <div className="bar-numbers">
            {enemy.health.current}/{enemy.health.max}
          </div>
        </div>
        <div className="enemy-image-placeholder">
          {/* Placeholder for enemy image */}
        </div>
      </div>

      {/* Add Grid Section */}
      <div className="grid-section">
        {<CombatGrid party={party} enemies={[enemy]} />}
      </div>

      <div className="player-section">
        <div className="player-stats">
          <div className="health-bar">
            <div
              className="fill"
              style={{
                width: `${(player.health.current / player.health.max) * 100}%`,
              }}
            ></div>
            <div className="bar-numbers">
              {player.health.current}/{player.health.max}
            </div>
          </div>
          <div className="stamina-bar">
            <div
              className="fill"
              style={{
                width: `${
                  (player.stamina.current / player.stamina.max) * 100
                }%`,
              }}
            ></div>
            <div className="bar-numbers">
              {player.stamina.current}/{player.stamina.max}
            </div>
          </div>
        </div>
        <div className="mana-bar">
          <div
            className="fill"
            style={{
              width: `${(player.mana.current / player.mana.max) * 100}%`,
            }}
          ></div>
          <div className="bar-numbers">
            {player.mana.current}/{player.mana.max}
          </div>
        </div>
        <table className="player-combat-menu">
          <tbody>
            <tr>
              <td style={{ padding: 0 + 'px' }}>
                <table className="player-combat-menu-tabs">
                  <tbody>
                    <tr>
                      {['skills', 'consumables', 'etc'].map((tab) => (
                        <td
                          className="combat-menu-btn-td"
                          id={`${tab}-btn-td`}
                          style={{
                            boxShadow:
                              currTab === tab
                                ? 'inset 0px 3px 5px rgba(0, 0, 0, 0.2)'
                                : 'none',
                            borderBottom:
                              currTab === tab ? 'none' : '1px solid grey',
                          }}
                        >
                          <button
                            className="combat-menu-btn"
                            onClick={() => handleMenuClick(tab)}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        </td>
                      ))}
                      <td className="td-hori-gap-fill"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <div className="tab-content">{currentTabContent}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Combat;
