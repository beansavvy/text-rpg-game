// import { db } from '@data/data';
import { useGameContext } from '@context/GameContext';
import { handleUseSkill } from '@eventHandlers/combatHandler';
import { useLogContext } from '@context/LogContext'; // Adjust the import path accordingly
import { useState } from 'react';

const CombatSkillMenu = () => {
  const {
    db,
    enemy,
    updatePlayerStats,
    updateEnemyStats,
    updateCombatActive,
    combatActive,
  } = useGameContext();
  const { addEntry } = useLogContext();
  const skills = db.characters[0]?.skillBook?.skills || [];

  const [renderKey, setRenderKey] = useState(0);

  const handleSkillButtonClick = (skill) => {
    if (combatActive) {
      handleUseSkill(
        skill,
        enemy,
        db,
        updatePlayerStats,
        updateEnemyStats,
        addEntry,
        updateCombatActive
      );
      setRenderKey((prevKey) => prevKey + 1); // Update the state to trigger re-render
    }
  };

  // console.log('SKILLS');
  // console.log(skills);

  // console.log('DB SKILLS');
  // console.log(db.characters);

  return (
    <table>
      <tbody>
        {skills.length > 0 &&
          skills.map((skill, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleSkillButtonClick(skill)}
                  className="dialogue-button"
                >
                  {skill.name}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CombatSkillMenu;
