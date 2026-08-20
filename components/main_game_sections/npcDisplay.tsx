import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';
import { useState } from 'react';
import Shopkeeper from '@components/main_game_sections/npc_sections/shopkeeper';
import NPCDialogue from '@components/main_game_sections/npc_sections/npcDialogue';

interface NPCOption {
  name: string;
  [key: string]: any;
}

const NPCDisplay = () => {
  const { npcActive, db, getItemById, updateNPCActive } = useGameContext();
  const [option, setOption] = useState<NPCOption | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortAttribute, setSortAttribute] = useState('');
  const [player, setPlayer] = useState(db.characters[0]);

  const handleOptionClick = (option: NPCOption) => {
    setOption(option);
    console.log(option);
  };

  const handleBack = () => {
    setOption(null); // Go back to the default view
  };

  const setNPCInactive = () => {
    updateNPCActive(null);
  };

  console.log('OPTION: ', option);

  if (option?.name.toLowerCase() === 'shop') {
    return <Shopkeeper npcId={npcActive.id} onBack={handleBack} />;
  } else if (option?.name.toLowerCase() === 'speak') {
    return <NPCDialogue npcId={npcActive.id} />;
  } else {
    return (
      <div style={{ height: '100%' }}>
        {/* Location title with tooltip */}
        <div
          className={'area-title'}
          style={{
            width: '100%',
            textAlign: 'center',
            borderBottom: '3px solid black',
            padding: '5px',
          }}
        >
          <Tooltip npc={npcActive}>
            <h1>
              <strong>{npcActive.name}</strong>
            </h1>
          </Tooltip>
        </div>

        {/* Dialogue section */}
        <div style={{ height: '30%' }} className="dialogue-box-section">
          <p>{npcActive.dialogue}</p>
        </div>

        {/* Options section */}
        {npcActive.options && (
          <div style={{ height: '20%' }}>
            <div className="dialogue-box-section-header">Options</div>
            <div className="dialogue-box-section">
              <table className="dialogue-btns-table">
                <tbody>
                  {npcActive.options.map((option, index) => {
                    if (index % 2 === 0) {
                      return (
                        <tr key={index}>
                          <td>
                            <div className={'tooltip'}>
                              <button
                                className="dialogue-button"
                                onClick={() => handleOptionClick(option)}
                              >
                                {option.name}
                              </button>
                            </div>
                          </td>
                          {npcActive.options[index + 1] && (
                            <td>
                              <div className={'tooltip'}>
                                <button
                                  className="dialogue-button"
                                  onClick={() =>
                                    handleOptionClick(
                                      npcActive.options[index + 1]
                                    )
                                  }
                                >
                                  {npcActive.options[index + 1].name}
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!npcActive.options && (
          <>
            <div style={{ height: '10px' }}></div>
            <div style={{ height: '20%' }}></div>
          </>
        )}

        {/* Directions table */}
        <div>
          <button onClick={setNPCInactive}>Leave</button>
        </div>
      </div>
    );
  }
};

export default NPCDisplay;
