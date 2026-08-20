'use client';
import React, { useState, useEffect } from 'react';
// import { db } from '@data/data.js';
import { useGameContext } from '@context/GameContext';
import { useLogContext } from '@context/LogContext';
import Tooltip from '@components/tooltip';

const GetMenuInventory = ({ viewMode, store = false }) => {
  const {
    db,
    addItemToPartyInventory,
    equipItemToCharacter,
    getItemById,
    removeItemFromPartyInventory,
    sellItem,
    npcActive,
    party,
  } = useGameContext();
  const { addEntry } = useLogContext();
  const [updateCounter, setUpdateCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortAttribute, setSortAttribute] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  // console.log('PLAYER NAME IN THE INVENTORY');
  // console.log(character);

  // const handleEquipItem = (item, playerId, slot = null) => {
  //   setSelectedIndex(null);
  //   // console.log('ITEM THAT IS BEING PASSED AND CONVERTED TO AN ID:', item);
  //   if (item.item != null) {
  //     equipItemToCharacter(playerId, item.itemId, slot, true);

  //     setUpdateCounter((prevCounter) => prevCounter + 1); // Trigger re-render
  //   }
  // };

  const handleUnequipItem = (item, slot = null) => {
    // console.log('ALL ITEM PROPERTIES ON UNEQUIP: ', item, playerId, slot);
    if (item != null) {
      equipItemToCharacter(playerId, item.itemId, slot, false);

      setUpdateCounter((prevCounter) => prevCounter + 1); // Trigger re-render
    }
  };

  const unequipInventoryFromEquipped = (item) => {
    const character = db.characters.find((char) => char.id === playerId);
    const slot = character.equipped.getSlotById(id);
    handleUnequipItem(item, playerId, [slot]);
    setUpdateCounter((prevCounter) => prevCounter + 1); // Trigger re-render
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortAttribute(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilterType('');
    setSortAttribute('');
  };

  const filterAndSortItems = (items) => {
    let detailedItems = items.map((item) => ({
      ...item,
      item: getItemById(item.itemId),
    }));

    // Filter items by search term (matches partial name or type)
    let filteredItems = detailedItems.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.item.name.toLowerCase().includes(term) ||
        item.item.type.toLowerCase().includes(term)
      );
    });

    // Ensure only unequipped items are shown if in store mode
    if (store) {
      filteredItems = filteredItems.filter(
        (item) => item.equipped === false || item.equipped == null
      );
    }

    // Sort by selected attribute if applicable
    if (sortAttribute) {
      filteredItems = filteredItems.sort((a, b) => {
        if (a.item[sortAttribute] < b.item[sortAttribute]) return -1;
        if (a.item[sortAttribute] > b.item[sortAttribute]) return 1;
        return 0;
      });
    }

    return filteredItems;
  };

  const handleSellItem = (item, quantity = 1) => {
    // Implement selling logic here, for now just log
    party.gold += item.item.value;
    sellItem(item.itemId, quantity);
    setUpdateCounter((prevCounter) => prevCounter + 1); // Trigger re-render
    addEntry(
      <span>
        You have sold {item.item.name} to {npcActive.name} for {item.item.value}{' '}
        gold.
      </span>
    );

    console.log(npcActive);
    // Remove the item from character inventory if needed.
    // character.inventory.removeItem(item.itemId); // if such a method exists
  };

  const filteredItems = filterAndSortItems(party.inventory.items);

  // const equippedItems = getEquippedItems();

  // console.log('FILTERED AND SORTED ITEMS: ', filteredItems);

  const mode = viewMode ? viewMode.toLowerCase() : '';
  const showInventory = mode.includes('inventory');
  const showEquipment = mode.includes('equipment');

  // Determine what to display based on viewMode
  // If none of the keywords are found, show both
  const displayInventory = showInventory || (!showInventory && !showEquipment);
  const displayEquipment = showEquipment || (!showInventory && !showEquipment);

  return (
    <>
      <table id="menu-invEq-wrapper-table">
        <thead>
          {/* If showing inventory, display the inventory header */}
          {displayInventory && (
            <tr>
              <th className="section-header">Inventory</th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Inventory Section */}
          {displayInventory && (
            <>
              <tr>
                <td style={{ height: '0px' }}>
                  <div className="search-filter">
                    <input
                      type="text"
                      placeholder="Search by partial name or type (e.g., 'wea', 'con')"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button onClick={resetSearch}>Reset</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="scrollable-content" style={{ height: '30%' }}>
                  <table id="menu-inv-wrapper-table" style={{ height: '30vh' }}>
                    <tbody>
                      {filteredItems.map((item, index) => (
                        <tr className="inventory-row" key={index}>
                          <td style={{ paddingRight: '5px' }}>
                            {item.quantity > 1 ? `${item.quantity}x ` : ''}
                          </td>
                          <td style={{ width: '100%' }}>
                            <div className="inv-item-container">
                              <Tooltip item={item.item}>
                                <span className="inv-item-name">
                                  {item.item.name}
                                </span>
                              </Tooltip>
                            </div>
                          </td>
                          {store ? (
                            <>
                              <td
                                style={{
                                  width: '66px',
                                  textAlign: 'right',
                                  borderLeft: '1px solid lightgray',
                                }}
                              >
                                <button
                                  onClick={() => handleSellItem(item)}
                                  style={{ width: '60px' }}
                                >
                                  Sell
                                </button>
                              </td>
                              {item.quantity > 1 && (
                                <td
                                  style={{
                                    width: '70px',
                                    textAlign: 'right',
                                    borderLeft: '1px solid lightgray',
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      handleSellItem(item, item.quantity)
                                    }
                                    style={{ width: '60px' }}
                                  >
                                    Sell All
                                  </button>
                                </td>
                              )}
                            </>
                          ) : (
                            <>
                              {/* {item.equipped !== undefined &&
                                item.equipped !== null && (
                                  <td
                                    style={{
                                      width: '66px',
                                      textAlign: 'right',
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                      }}
                                    >
                                      {item.equipped === true && (
                                        <button
                                          onClick={() =>
                                            unequipInventoryFromEquipped(item)
                                          }
                                        >
                                          Unequip
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                )} */}
                              {(item.equipped === undefined ||
                                item.equipped === null) && (
                                <td
                                  style={{ minWidth: '66px' }}
                                  className="table-fill-excess-td"
                                ></td>
                              )}
                            </>
                          )}
                          {(item.equipped == undefined ||
                            item.equipped == null) && (
                            <td
                              style={{ minWidth: '10px' }}
                              className="table-fill-excess-td"
                            ></td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td id="menu-invEq-gold-container">Gold: {party.gold}</td>
              </tr>
            </>
          )}

          {/* Equipment Section
          {displayEquipment && (
            <>
              <tr>
                <th
                  style={{ paddingTop: '10px', borderTop: '1px solid black' }}
                >
                  Character Equipment
                </th>
              </tr>
              <tr>
                <td className="scrollable-content" style={{ height: '45%' }}>
                  <table
                    id="menu-equipped-wrapper-table"
                    style={{ height: '40vh' }}
                  >
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
                              <td
                                style={{ minWidth: '66px' }}
                                className="table-fill-excess-td"
                              ></td>
                            </>
                          )}
                          {equippedItems[slot] != null && (
                            <>
                              <td style={{ textAlign: 'left', width: '100%' }}>
                                <Tooltip
                                  content={
                                    <>
                                      <span className="tooltiptext-header">
                                        {equippedItems[slot].name}
                                      </span>
                                      {equippedItems[slot].description}
                                      <br />
                                      <span className="tooltiptext-seperator"></span>
                                      {equippedItems[slot].minDamage != null &&
                                        equippedItems[slot].maxDamage !=
                                          null && (
                                          <>
                                            Damage:{' '}
                                            {equippedItems[slot].minDamage} -{' '}
                                            {equippedItems[slot].maxDamage}
                                            <br />
                                          </>
                                        )}
                                      {equippedItems[slot].attackSpeed !=
                                        null && (
                                        <>
                                          Attack Speed:{' '}
                                          {equippedItems[slot].attackSpeed}
                                          <br />
                                        </>
                                      )}
                                      {equippedItems[slot].attackSpeed !=
                                        null &&
                                        equippedItems[slot].minDamage != null &&
                                        equippedItems[slot].maxDamage !=
                                          null && (
                                          <>
                                            DPS:{' '}
                                            {(
                                              ((equippedItems[slot].minDamage +
                                                equippedItems[slot].maxDamage) /
                                                2) *
                                              equippedItems[slot].attackSpeed
                                            ).toFixed(2)}
                                            <br />
                                          </>
                                        )}
                                      {equippedItems[slot].critChance !=
                                        null && (
                                        <>
                                          Crit Chance:{' '}
                                          {equippedItems[slot].critChance}
                                          <br />
                                        </>
                                      )}
                                      {equippedItems[slot].range != null && (
                                        <>
                                          Range: {equippedItems[slot].range}
                                          <br />
                                        </>
                                      )}
                                      {equippedItems[slot].defense != null && (
                                        <>
                                          Defense: {equippedItems[slot].defense}
                                          <br />
                                        </>
                                      )}
                                      {equippedItems[slot].bonusMagic !=
                                        null && (
                                        <>
                                          Bonus Magic Damage:{' '}
                                          {equippedItems[slot].bonusMagic}
                                          <br />
                                        </>
                                      )}
                                      Value: {equippedItems[slot].value}
                                      {equippedItems[slot].levelReq > 1 && (
                                        <>
                                          Level Requirement:{' '}
                                          {equippedItems[slot].levelReq}
                                          <br />
                                        </>
                                      )}
                                      {equippedItems[slot].attributeReq !=
                                        null && (
                                        <>
                                          Attribute Requirement:{' '}
                                          {equippedItems[slot].attributeReq}
                                          <br />
                                        </>
                                      )}
                                    </>
                                  }
                                >
                                  <span className="inv-item-name">
                                    {equippedItems[slot].name}
                                  </span>
                                </Tooltip>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <button
                                  onClick={() =>
                                    handleUnequipItem(
                                      character.equipped[slot],
                                      character.id,
                                      [slot]
                                    )
                                  }
                                >
                                  Unequip
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </>
          )} */}

          {displayInventory && displayEquipment && (
            <tr>
              <td style={{ height: '100%' }}></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GetMenuInventory;
