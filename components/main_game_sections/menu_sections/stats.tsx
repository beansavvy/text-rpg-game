import { useGameContext } from '@context/GameContext';

const GetMenuStats = (character: any) => {
  // const { db } = useGameContext();
  // const character = db.characters[0];

  character = character.character;

  // console.log('CHARACTER: ', character);

  return (
    <table className="stats-table">
      {/* <thead>
        <tr>
          <td
            className="section-header"
            colSpan="2"
            style={{ padding: 5 + 'px' }}
          >
            <strong>Stats</strong>
          </td>
        </tr>
      </thead> */}
      <tbody>
        <tr>
          <td className="stats-table-seperator" colSpan="2">
            <strong>Information</strong>
          </td>
        </tr>
        {/* Information section */}
        <tr>
          <td>Name:</td>
          <td>{character.name}</td>
        </tr>
        <tr>
          <td>Race:</td>
          <td>{character.race}</td>
        </tr>
        <tr>
          <td>Class:</td>
          <td>{character.class}</td>
        </tr>
        <tr>
          <td>Health:</td>
          <td>
            {character.health.current} / {character.health.max}
          </td>
        </tr>
        <tr>
          <td>Stamina:</td>
          <td>
            {character.stamina.current} / {character.stamina.max}
          </td>
        </tr>
        <tr>
          <td>Mana:</td>
          <td>
            {character.mana.current} / {character.mana.max}
          </td>
        </tr>
        <tr>
          <td>Level:</td>
          <td>{character.level}</td>
        </tr>
        <tr>
          <td>Experience:</td>
          <td>
            {character.experience.current} / {character.experience.max}
          </td>
        </tr>
        {/* Additional Information rows as needed */}

        <tr>
          <td className="stats-table-seperator" colSpan="2">
            <strong>Attributes</strong>
          </td>
        </tr>
        {/* Attributes section */}
        <tr>
          <td>Strength</td>
          <td>{character.stats.strength}</td>
        </tr>
        <tr>
          <td>Dexterity</td>
          <td>{character.stats.dexterity}</td>
        </tr>
        <tr>
          <td>Vitality</td>
          <td>{character.stats.vitality}</td>
        </tr>
        <tr>
          <td>Endurance</td>
          <td>{character.stats.endurance}</td>
        </tr>
        <tr>
          <td>Intellect</td>
          <td>{character.stats.intellect}</td>
        </tr>
        <tr>
          <td>Luck</td>
          <td>{character.stats.luck}</td>
        </tr>
        {/* Additional Attribute rows as needed */}

        <tr>
          <td className="stats-table-seperator" colSpan="2">
            <strong>Offense</strong>
          </td>
        </tr>
        {/* Offense section */}
        {(character.weaponStats.mainHand.type == 'Weapon' ||
          character.weaponStats.mainHand.type == 'Empty') && (
          <>
            <tr>
              <td className="stats-table-seperator-2nd" colSpan="2">
                Main-Hand Stats
              </td>
            </tr>
            <tr>
              <td>Damage:</td>
              <td>
                {character.weaponStats.mainHand.damage.min} -{' '}
                {character.weaponStats.mainHand.damage.max}
              </td>
            </tr>
            <tr>
              <td>Attack Speed:</td>
              <td>{character.weaponStats.mainHand.attackSpeed}</td>
            </tr>
            <tr>
              <td>Hit Chance:</td>
              <td>{character.weaponStats.mainHand.hitChance * 100}%</td>
            </tr>
            <tr>
              <td>Crit Chance:</td>
              <td>{character.weaponStats.mainHand.critChance * 100}%</td>
            </tr>
          </>
        )}

        {character.weaponStats.offHand != null &&
          (character.weaponStats.offHand.type == 'Weapon' ||
            character.weaponStats.offHand.type == 'Empty') && (
            <>
              <tr>
                <td className="stats-table-seperator-2nd" colSpan="2">
                  Off-Hand Stats
                </td>
              </tr>
              <tr>
                <td>Damage:</td>
                <td>
                  {character.weaponStats.offHand.damage.min} -{' '}
                  {character.weaponStats.offHand.damage.max}
                </td>
              </tr>
              <tr>
                <td>Attack Speed:</td>
                <td>{character.weaponStats.offHand.attackSpeed}</td>
              </tr>
              <tr>
                <td>Hit Chance:</td>
                <td>{character.weaponStats.offHand.hitChance * 100}%</td>
              </tr>
              <tr>
                <td>Crit Chance:</td>
                <td>{character.weaponStats.offHand.critChance * 100}%</td>
              </tr>
            </>
          )}
        {/* Additional Offense rows as needed */}
        <tr>
          <td className="stats-table-seperator-2nd" colSpan="2">
            Other
          </td>
        </tr>
        <tr>
          <td>Bonus Magic Damage:</td>
          <td>{character.subStats.bonusMagic}</td>
        </tr>
        <tr>
          <td>Bonus Physical Damage:</td>
          <td>{character.subStats.bonusPhys}</td>
        </tr>
        <tr>
          <td className="stats-table-seperator" colSpan="2">
            <strong>Defense</strong>
          </td>
        </tr>
        {/* Defense section */}
        <tr>
          <td>Defense</td>
          <td>{character.subStats.defense}</td>
        </tr>
        <tr>
          <td>Magic Defense</td>
          <td>{character.subStats.magicDefense}</td>
        </tr>
        <tr>
          <td>Percent Damage Reduction</td>
          <td>{character.subStats.percentDR}</td>
        </tr>
        <tr>
          <td>Magic Resistance</td>
          <td>{character.subStats.magicRes}</td>
        </tr>
        {/* Additional Defense rows as needed */}

        <tr>
          <td className="stats-table-seperator" colSpan="2">
            <strong>Other</strong>
          </td>
        </tr>
        {/* Other section */}
        <tr>
          <td>Luck</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>Charisma</td>
          <td>{}</td>
        </tr>
        {/* Additional Other rows as needed */}
      </tbody>
    </table>
  );
};

export default GetMenuStats;
