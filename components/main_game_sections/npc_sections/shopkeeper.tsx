import React, { useState } from 'react';
import { useGameContext } from '@context/GameContext';
import { useLogContext } from '@context/LogContext';
import Tooltip from '@components/tooltip';
import GetMenuInventory from '@components/main_game_sections/menu_sections/inventory';

const Shopkeeper = ({ npcId, onBack }) => {
  const { db, getItemById, addItemToInventory, updateNPCActive } =
    useGameContext();
  const { addEntry } = useLogContext();
  const npcActive = db.npcs.find((npc) => npc.id === npcId);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortAttribute, setSortAttribute] = useState('');
  const [player, setPlayer] = useState(db.characters[0]);

  const handleBuyItem = (itemId) => {
    if (getItemById(itemId).value <= player.gold) {
      npcActive.removeItemFromInventory(itemId);
      addItemToInventory(player.id, itemId, db);
      player.gold -= getItemById(itemId).value;
      addEntry(
        <span>
          You have bought {getItemById(itemId).name} from {npcActive.name} for{' '}
          {getItemById(itemId).value} gold.
        </span>
      );
    } else {
      console.log('Insufficient Gold.');
    }
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

    let filteredItems = detailedItems;

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filteredItems = filteredItems.filter(
        (item) => item.item.type.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (sortAttribute) {
      filteredItems = filteredItems.sort((a, b) => {
        if (a.item[sortAttribute] < b.item[sortAttribute]) return -1;
        if (a.item[sortAttribute] > b.item[sortAttribute]) return 1;
        return 0;
      });
    }

    return filteredItems;
  };

  const shopInv = filterAndSortItems(npcActive.getInventory(db));

  return (
    <div style={{ height: '100%' }}>
      {/* NPC Shop Title */}
      <div
        className={'area-title'}
        style={{
          width: '100%',
          textAlign: 'center',
          borderBottom: '3px solid black',
          padding: '5px',
        }}
      >
        <h1>
          <strong>{npcActive.name}&apos;s Shop</strong>
        </h1>
      </div>
      <div></div>
      {/* Search and Filter Section */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={resetSearch}>Reset</button>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="weapon">Weapon</option>
          <option value="armor">Armor</option>
          <option value="consumable">Consumable</option>
          <option value="misc">Misc</option>
        </select>
        <select value={sortAttribute} onChange={handleSortChange}>
          <option value="">No Sort</option>
          <option value="levelReq">Sort by Level</option>
          <option value="minDamage">Sort by Min Damage</option>
          <option value="maxDamage">Sort by Max Damage</option>
          <option value="value">Sort by Value</option>
          <option value="critChance">Sort by Crit Chance</option>
        </select>
      </div>

      {/* Shop Inventory Section */}
      <div
        className="shop-inventory-section"
        style={{ height: '40%', overflowY: 'scroll' }}
      >
        <table className="inventory-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Item</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopInv.map((item, index) => (
              <tr key={index} className="inventory-row">
                <td
                  style={{ paddingLeft: 10 + 'px', paddingRight: 10 + 'px' }}
                ></td>
                <td style={{ paddingRight: '5px' }}>
                  {item.quantity > 1 ? `${item.quantity}x ` : ''}
                </td>
                <td style={{ width: '100%' }}>
                  <div className="inv-item-container">
                    <Tooltip item={item.item}>
                      <span className="inv-item-name">{item.item.name}</span>
                    </Tooltip>
                  </div>
                </td>
                <td
                  className="inv-item-row"
                  style={{ width: '20%', textAlign: 'center' }}
                >
                  <div className="inv-item-container">
                    {item.item.value} Gold
                  </div>
                </td>
                <td
                  className="inv-item-row"
                  style={{ width: '20%', textAlign: 'center' }}
                >
                  <button
                    onClick={() => {
                      // Handle buying item logic
                      handleBuyItem(item.itemId);
                      console.log(`Buying ${item.item.name}`);
                    }}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player's Inventory Section */}
      <div
        className="player-inventory-section"
        style={{
          marginTop: '20px',
          borderTop: '2px solid black',
          paddingTop: '10px',
        }}
      >
        <GetMenuInventory
          playerId={player.id}
          viewMode={'inventory'}
          store={true}
        />
      </div>

      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default Shopkeeper;
