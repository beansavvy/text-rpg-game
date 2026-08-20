'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('./menu_sections/customMap'), {
  ssr: false,
});

const Inventory = dynamic(() => import('./menu_sections/inventory'), {
  ssr: false,
});

const Party = dynamic(() => import('./menu_sections/party'), {
  ssr: false,
});

export type MenuTab =
  | 'inventory'
  | 'party'
  | 'quests'
  | 'skills'
  | 'map'
  | 'system';

interface MenuPopupProps {
  activeMenu: MenuTab | null;
  onClose: () => void;
}

const MenuPopup = ({ activeMenu, onClose }: MenuPopupProps) => {
  if (activeMenu === null) {
    return null;
  }

  const getMenuContent = () => {
    switch (activeMenu) {
      case 'inventory':
        return <Inventory />;

      case 'party':
        return <Party />;

      case 'quests':
        return <div>Quest log content goes here</div>;

      case 'skills':
        return <div>Skills content goes here</div>;

      case 'map':
        return <CustomMap />;

      case 'system':
        return <div>System settings content goes here</div>;
    }
  };

  return (
    <div className="menu-popup-container">
      <div className="menu-popup-header">
        <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h2>

        <button
          className="menu-popup-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <div className="menu-popup-content">{getMenuContent()}</div>
    </div>
  );
};

export default MenuPopup;
