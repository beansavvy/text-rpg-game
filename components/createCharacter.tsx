'use client';

import { useState, useEffect } from 'react';
// import { races, classes } from '@data/data'; // Adjust the import path as needed
import { useGameContext } from '@context/GameContext';

const CreateCharacter = () => {
  const { createCharacter, setNewCurrentLocation, db } = useGameContext();
  const races: any[] = db.races;
  const classes: any[] = db.classes;
  const [name, setName] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState('Warrior'); // Default class
  const [statPoints, setStatPoints] = useState(5);
  type AttributeKey = keyof typeof attributes;
  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    vitality: 0,
    endurance: 0,
    intellect: 0,
    luck: 0,
  });

  const getBaseAttributes = (race: any, cls: any) => {
    const raceStats = race ? race.statBonuses : {};
    const classStats = cls ? cls.statBonuses : {};
    return {
      strength: (raceStats.strength || 0) + (classStats.strength || 0),
      dexterity: (raceStats.dexterity || 0) + (classStats.dexterity || 0),
      vitality: (raceStats.vitality || 0) + (classStats.vitality || 0),
      endurance: (raceStats.endurance || 0) + (classStats.endurance || 0),
      intellect: (raceStats.intellect || 0) + (classStats.intellect || 0),
      luck: (raceStats.luck || 0) + (classStats.luck || 0),
    };
  };

  useEffect(() => {
    const selectedRaceObj = races.find((race) => race.name === selectedRace);
    const selectedClassObj = classes.find((cls) => cls.name === selectedClass);
    if (selectedRaceObj && selectedClassObj) {
      setAttributes(getBaseAttributes(selectedRaceObj, selectedClassObj));
    }
  }, [selectedRace, selectedClass]);

  const handleAttributeChange = (attr: AttributeKey, change: number) => {
    const baseAttributes = getBaseAttributes(
      races.find((race) => race.name === selectedRace),
      classes.find((cls) => cls.name === selectedClass)
    );

    // Ensure the attribute cannot be reduced below the base attribute value
    if (attributes[attr] + change < baseAttributes[attr]) return;

    // Ensure the attribute cannot be increased if no stat points are available
    if (change > 0 && statPoints <= 0) return;

    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attr]: prevAttributes[attr] + change,
    }));
    setStatPoints((prevPoints) => prevPoints - change);
  };

  const handleCreateCharacter = () => {
    createCharacter(name, selectedRace, selectedClass, attributes);
    setNewCurrentLocation('mainGame');
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={4}>
              Welcome to the character creation, please enter a name, select a
              race and class, and set your stats. Hover over anything to get a
              detailed description.
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <table>
                <tbody>
                  {races.map((race, index) =>
                    index % 2 === 0 ? (
                      <tr key={index}>
                        <td>
                          <button
                            className={`formatted-btn-1 ${
                              selectedRace === race.name ? 'selected' : ''
                            }`}
                            type="button"
                            onClick={() => setSelectedRace(race.name)}
                            title={race.flavorText}
                          >
                            {race.name}
                          </button>
                        </td>
                        {races[index + 1] && (
                          <td>
                            <button
                              className={`formatted-btn-1 ${
                                selectedRace === races[index + 1].name
                                  ? 'selected'
                                  : ''
                              }`}
                              type="button"
                              onClick={() =>
                                setSelectedRace(races[index + 1].name)
                              }
                              title={races[index + 1].flavorText}
                            >
                              {races[index + 1].name}
                            </button>
                          </td>
                        )}
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <table>
                <tbody>
                  {classes.map((cls, index) =>
                    index % 2 === 0 ? (
                      <tr key={index}>
                        <td>
                          <button
                            className={`formatted-btn-1 ${
                              selectedClass === cls.name ? 'selected' : ''
                            }`}
                            type="button"
                            onClick={() => setSelectedClass(cls.name)}
                            title={cls.flavorText}
                          >
                            {cls.name}
                          </button>
                        </td>
                        {classes[index + 1] && (
                          <td>
                            <button
                              className={`formatted-btn-1 ${
                                selectedClass === classes[index + 1].name
                                  ? 'selected'
                                  : ''
                              }`}
                              type="button"
                              onClick={() =>
                                setSelectedClass(classes[index + 1].name)
                              }
                              title={classes[index + 1].flavorText}
                            >
                              {classes[index + 1].name}
                            </button>
                          </td>
                        )}
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <table>
                <thead>
                  <tr>
                    <th colSpan={4}>Stat Points Left: {statPoints}</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(attributes) as AttributeKey[]).map((attr) => (
                    <tr key={attr}>
                      <td>{attr.charAt(0).toUpperCase() + attr.slice(1)}</td>
                      <td>{attributes[attr]}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleAttributeChange(attr, -1)}
                          disabled={
                            attributes[attr] <=
                            getBaseAttributes(
                              races.find((race) => race.name === selectedRace),
                              classes.find((cls) => cls.name === selectedClass)
                            )[attr]
                          }
                        >
                          -1
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleAttributeChange(attr, 1)}
                          disabled={statPoints <= 0}
                        >
                          +1
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <button type="submit" onClick={handleCreateCharacter}>
                Create Character
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        .formatted-btn-1 {
          padding: 10px;
          margin: 5px;
          background-color: white;
          color: black;
          border: 1px solid black;
          cursor: pointer;
        }
        .formatted-btn-1.selected {
          background-color: darkgrey;
          color: white;
          box-shadow: inset 0 0 5px black;
        }
      `}</style>
    </>
  );
};

export default CreateCharacter;
