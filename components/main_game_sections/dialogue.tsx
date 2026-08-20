import React, { useState } from 'react';
import styles from '@styles/globalStyles.css';
import { useLogContext } from '@context/LogContext'; // Adjust the import path accordingly
import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';

const Dialogue = () => {
  const {
    db,
    setCurrentLocationId,
    discoverLocation,
    getLocationById,
    getCurrentLocation,
    updateCombatActive,
    setNewCurrentLocation,
    generateEnemy,
    updateNPCActive,
  } = useGameContext();
  const [location, setLocation] = useState(getCurrentLocation());
  const { addEntry } = useLogContext();

  // console.log('LOCATION INFO: ', location);

  const handleDirectionClick = (directionId) => {
    // console.log('DIRECTION ID: ' + directionId);
    setCurrentLocationId(directionId);
    const newLocation = getLocationById(directionId);
    // console.log(newLocation);
    setLocation(newLocation);
    discoverLocation(directionId);
    addEntry(<span>You have entered {newLocation.name}</span>);
  };

  const handleOptionClick = (option) => {
    if (option.type === 'hunt') {
      // console.log('GENERATING A NEW ENEMY');
      generateEnemy();
      updateCombatActive(1);
    } else if (option.type === 'npc') {
      updateNPCActive(option.npcId);
    } else if (option.type === 'speak') {
    } else {
      console.log('OPTION', option);
    }
  };

  const dialogue = location.dialogue;
  const options = location.options;
  const directions = location.directions;

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
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
            margin: 'auto',
          }}
        >
          <Tooltip location={location}>
            <h1>
              <strong>{location.name}</strong>
            </h1>
          </Tooltip>
        </div>
      </div>

      {/* Dialogue section */}
      <div style={{ height: '30%' }} className="dialogue-box-section">
        <p>{dialogue}</p>
      </div>

      {/* Options section */}
      {options && (
        <div style={{ height: '20%' }}>
          <div className="dialogue-box-section-header">Options</div>
          <div className="dialogue-box-section">
            <table className="dialogue-btns-table">
              <tbody>
                {options.map((option, index) => {
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
                        {options[index + 1] && (
                          <td>
                            <div className={'tooltip'}>
                              <button
                                className="dialogue-button"
                                onClick={() =>
                                  handleOptionClick(options[index + 1])
                                }
                              >
                                {options[index + 1].name}
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
      {!options && (
        <>
          <div style={{ height: '10px' }}></div>
          <div style={{ height: '20%' }}></div>
        </>
      )}

      {/* Directions table */}
      {directions && (
        <div style={{ height: '20%' }}>
          <div className="dialogue-box-section-header">Directions</div>
          <div className="dialogue-box-section">
            <table className="dialogue-btns-table">
              <tbody>
                {directions.map((directionId, index) => {
                  if (index % 2 === 0) {
                    const direction1 = getLocationById(directionId);
                    const direction2 = directions[index + 1]
                      ? getLocationById(directions[index + 1])
                      : null;
                    // console.log(
                    //   'DIRECTION 1: ',
                    //   direction1.name,
                    //   '\nDIRECTION 2: ',
                    //   direction2.name
                    // );
                    return (
                      <tr key={index}>
                        <td style={{ width: '50%' }}>
                          <Tooltip location={direction1}>
                            <button
                              onClick={() => handleDirectionClick(directionId)}
                              className="dialogue-button"
                            >
                              {direction1.name}
                            </button>
                          </Tooltip>
                        </td>
                        <td style={{ width: '50%' }}>
                          {direction2 && (
                            <Tooltip location={direction2}>
                              <button
                                onClick={() =>
                                  handleDirectionClick(directions[index + 1])
                                }
                                className="dialogue-button"
                              >
                                {direction2.name}
                              </button>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialogue;
