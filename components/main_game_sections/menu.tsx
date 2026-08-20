import React from 'react';
import '@styles/menu.css';
import type { MenuTab } from './menuPopup';

interface MenuProps {
  activeMenu: MenuTab | null;
  onMenuClick: (tab: MenuTab) => void;
}

const Menu = ({ activeMenu, onMenuClick }: MenuProps) => {
  const tabs: MenuTab[] = [
    'inventory',
    'party',
    'quests',
    'skills',
    'map',
    'system',
  ];

  return (
    <table id="right-panel-table">
      <tbody>
        <tr>
          <td>
            <table id="menu-tabs-table">
              <tbody>
                {tabs.map((tab) => (
                  <tr key={tab}>
                    <td
                      className="menu-btn-td"
                      id={`${tab}-btn-td`}
                      style={{
                        boxShadow:
                          activeMenu === tab
                            ? 'inset -3px 0px 5px rgba(0, 0, 0, 0.2)'
                            : 'none',
                        borderLeft:
                          activeMenu === tab ? 'none' : '1px solid grey',
                      }}
                    >
                      <button
                        className="menu-btn"
                        onClick={() => onMenuClick(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="td-vert-gap-fill"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Menu;
