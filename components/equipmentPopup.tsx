import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';

const GetEquipmentPopup = ({
  slot,
  characterId,
  onClose,
}: {
  slot: string;
  characterId: string;
  onClose: () => void;
}) => {
  const { party, getItemById, equipItemToCharacter, db } = useGameContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortAttribute, setSortAttribute] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  const handleEquipItem = (itemId) => {
    equipItemToCharacter(characterId, itemId, slot, true);
    onClose();
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

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filterAndSortItems = (items) => {
    let detailedItems = items.map((item) => ({
      ...item,
      item: getItemById(item.itemId),
    }));

    // console.log(detailedItems);

    // Filter items by slot (checking overlap) and equipped status
    let filteredItems = detailedItems.filter((item) =>
      Array.isArray(item.item.slot) // Check if slot is an array
        ? item.item.slot.some((itemSlot) => slot.includes(itemSlot)) &&
          !item.equipped
        : slot.includes(item.item.slot) && // Handle single slot as a string
          !item.equipped
    );

    // Filter items by search term (matches partial name or type)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.item.name.toLowerCase().includes(term) ||
          item.item.type.toLowerCase().includes(term)
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

  const filteredItems = filterAndSortItems(party.inventory.items);

  return (
    <div className="equipment-popup" ref={popupRef}>
      <div className="popup-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <table id="menu-invEq-wrapper-table">
          <thead>
            {/* If showing inventory, display the inventory header */}

            <tr>
              <th className="section-header">Inventory - {slot}</th>
            </tr>
          </thead>
          <tbody>
            {/* Inventory Section */}
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
                          <td
                            style={{ minWidth: '10px' }}
                            className="table-fill-excess-td"
                          ></td>
                          <td>
                            <button
                              onClick={() => handleEquipItem(item.itemId)}
                            >
                              Equip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetEquipmentPopup;
