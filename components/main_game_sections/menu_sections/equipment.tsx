'use client';
import React, { useState } from 'react';
import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';
import GetEquipmentPopup from '@components/equipmentPopup';

const Equipment = (character: any) => {
  const { equipItemToCharacter, getItemById, openItemPopup } = useGameContext();

  character = character.character;

  const [popupOpen, setPopupOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<string | null>(null);

  const handleEquipButtonClick = (slot: string) => {
    setCurrentSlot(slot); // Set the slot to filter items for
    setPopupOpen(true); // Open the popup
  };

  const handleUnequipItem = (item, characterId, slot: []) => {
    equipItemToCharacter(characterId, item.itemId, slot, false);
  };

  const getEquippedItems = () => {
    let equipped = {
      mainHand:
        character.equipped['mainHand'] != null
          ? getItemById(character.equipped['mainHand'].itemId)
          : null,
      offHand:
        character.equipped['offHand'] != null
          ? getItemById(character.equipped['offHand'].itemId)
          : null,
      head:
        character.equipped['head'] != null
          ? getItemById(character.equipped['head'].itemId)
          : null,
      shoulders:
        character.equipped['shoulders'] != null
          ? getItemById(character.equipped['shoulders'].itemId)
          : null,
      chest:
        character.equipped['chest'] != null
          ? getItemById(character.equipped['chest'].itemId)
          : null,
      wrists:
        character.equipped['wrists'] != null
          ? getItemById(character.equipped['wrists'].itemId)
          : null,
      hands:
        character.equipped['hands'] != null
          ? getItemById(character.equipped['hands'].itemId)
          : null,
      waist:
        character.equipped['waist'] != null
          ? getItemById(character.equipped['waist'].itemId)
          : null,
      legs:
        character.equipped['legs'] != null
          ? getItemById(character.equipped['legs'].itemId)
          : null,
      feet:
        character.equipped['feet'] != null
          ? getItemById(character.equipped['feet'].itemId)
          : null,
      neck:
        character.equipped['neck'] != null
          ? getItemById(character.equipped['neck'].itemId)
          : null,
      back:
        character.equipped['back'] != null
          ? getItemById(character.equipped['back'].itemId)
          : null,
      fingerLeft:
        character.equipped['fingerLeft'] != null
          ? getItemById(character.equipped['fingerLeft'].itemId)
          : null,
      fingerRight:
        character.equipped['fingerRight'] != null
          ? getItemById(character.equipped['fingerRight'].itemId)
          : null,
      ammo:
        character.equipped['ammo'] != null
          ? getItemById(character.equipped['ammo'].itemId)
          : null,
    };

    return equipped;
  };

  const equippedItems = getEquippedItems();

  return (
    <>
      <table id="menu-equipped-wrapper-table">
        <tbody>
          {[
            'mainHand',
            'offHand',
            'head',
            'shoulders',
            'chest',
            'wrists',
            'hands',
            'waist',
            'legs',
            'feet',
            'neck',
            'back',
            'fingerLeft',
            'fingerRight',
            'ammo',
          ].map((slot) => (
            <tr key={slot} className="inventory-row">
              <td
                style={{
                  textAlign: 'right',
                  minWidth: '105px',
                  paddingRight: '5px',
                }}
              >
                {slot
                  .replace(/([A-Z])/g, '-$1')
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </td>
              {equippedItems[slot] == null && (
                <>
                  <td style={{ textAlign: 'left' }}>Empty</td>
                </>
              )}
              {equippedItems[slot] != null && (
                <>
                  <td
                    className="inv-item-container"
                    style={{ textAlign: 'left', width: '100%' }}
                  >
                    <Tooltip item={equippedItems[slot]}>
                      <span className="inv-item-name">
                        {equippedItems[slot].name}
                      </span>
                    </Tooltip>
                  </td>
                </>
              )}
              <td
                style={{ minWidth: '66px' }}
                className="table-fill-excess-td"
              ></td>
              <td style={{ textAlign: 'right', padding: '0px 5px' }}>
                <button onClick={() => openItemPopup(slot, character.id)}>
                  Equip
                </button>
              </td>
              <td style={{ textAlign: 'right', padding: '0px 5px' }}>
                <button
                  disabled={equippedItems[slot] == null}
                  style={{ opacity: equippedItems[slot] == null ? '0' : '1' }}
                  onClick={() =>
                    handleUnequipItem(character.equipped[slot], character.id, [
                      slot,
                    ])
                  }
                >
                  Unequip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupOpen && (
        <GetEquipmentPopup
          slot={currentSlot}
          charcterId={character.id}
          onClose={closePopup}
        />
      )}
    </>
  );
};

export default Equipment;
