import React, { useState } from 'react';
import { useGameContext } from '@context/GameContext';
import GetMenuStats from './stats';
import Equipment from './equipment';
import PartyFormationGrid from './partyFormationGrid'; // Import the new component

const GetPartyMenu = () => {
  const { db } = useGameContext();
  const [openSections, setOpenSections] = useState<
    Record<number, { stats?: boolean; equipment?: boolean }>
  >({});
  const [formationMode, setFormationMode] = useState(false); // Toggle formation grid

  const toggleSection = (index: number, section: 'stats' | 'equipment') => {
    setOpenSections((prev) => {
      const current = prev[index] || {};
      const updatedSectionState = {
        stats: section === 'stats' ? !current.stats : false,
        equipment: section === 'equipment' ? !current.equipment : false,
      };

      return { ...prev, [index]: updatedSectionState };
    });
  };

  return (
    <div className="party-menu">
      <h2 className="section-header">Party</h2>
      <ul className="party-list">
        {db.characters.map((character: any, index: number) => (
          <li key={index} className="party-member">
            <div
              className="party-member-header"
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
              }}
            >
              <strong>{character.name}</strong>
            </div>
            <div className="party-member-actions">
              <button
                className="action-button"
                onClick={() => toggleSection(index, 'stats')}
              >
                Stats
              </button>
              <button
                className="action-button"
                onClick={() => toggleSection(index, 'equipment')}
              >
                Equipment
              </button>
            </div>
            {openSections[index]?.stats && (
              <div className="party-member-stats">
                <GetMenuStats character={character} />
              </div>
            )}
            {openSections[index]?.equipment && (
              <div className="party-member-equipment">
                <Equipment character={character} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        className="formation-button"
        onClick={() => setFormationMode(!formationMode)}
      >
        {formationMode ? 'Close Formation' : 'Edit Formation'}
      </button>
      {formationMode && (
        <div className="party-formation">
          <PartyFormationGrid />
        </div>
      )}

      <style jsx>{`
        .party-list {
          list-style: none;
          padding: 0;
        }
        .party-member {
          border: 1px solid #ddd;
          overflow: hidden;
          margin-bottom: 10px;
          border-bottom: 4px solid grey;
        }
        .party-member-header {
          font-size: 18px;
        }
        .party-member-actions {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          background-color: #f9f9f9;
        }
        .action-button {
          padding: 5px 10px;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid #ddd;
          background-color: #fff;
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        .action-button:hover {
          background-color: #e0e0e0;
        }
        .party-member-stats,
        .party-member-equipment {
          padding: 10px;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default GetPartyMenu;
