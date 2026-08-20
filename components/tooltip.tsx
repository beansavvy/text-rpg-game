import React, { useRef, useEffect, useState } from 'react';
import { useGameContext } from '@context/GameContext';

const Tooltip = ({ children, content, item, location, npc, enemy }: any) => {
  const { showTooltip, hideTooltip } = useGameContext();
  const triggerRef = useRef<HTMLSpanElement>(null);

  const calculateContent = () => {
    if (item) {
      return (
        <>
          <span className="tooltiptext-header">{item.name}</span>
          {item.description}
          <br />
          <span className="tooltiptext-seperator"></span>
          {item.minDamage != null && item.maxDamage != null && (
            <>
              Damage: {item.minDamage} - {item.maxDamage}
              <br />
            </>
          )}
          {item.attackSpeed != null && (
            <>
              Attack Speed: {item.attackSpeed}
              <br />
            </>
          )}
          {item.attackSpeed != null &&
            item.minDamage != null &&
            item.maxDamage != null && (
              <>
                DPS:{' '}
                {(
                  ((item.minDamage + item.maxDamage) / 2) *
                  item.attackSpeed
                ).toFixed(2)}
                <br />
              </>
            )}
          {item.critChance != null && (
            <>
              Crit Chance: {item.critChance}
              <br />
            </>
          )}
          {item.range != null && (
            <>
              Range: {item.range}
              <br />
            </>
          )}
          {item.attributes != null && item.attributes.defense != null && (
            <>
              Defense: {item.attributes.defense}
              <br />
            </>
          )}
          {item.attributes != null && item.attributes.bonusMagic != null && (
            <>
              Bonus Magic Damage: {item.attributes.bonusMagic}
              <br />
            </>
          )}

          {item.levelReq > 1 && (
            <>
              Level Requirement: {item.levelReq}
              <br />
            </>
          )}
          {item.attributeReq != null && (
            <>
              Attribute Requirement: {item.attributeReq}
              <br />
            </>
          )}
          {item.value != null && (
            <>
              Value: {item.value} gold
              <br />
            </>
          )}
        </>
      );
    }

    if (location) {
      // console.log('TOOLTIP LOCATION', location);
      return (
        <>
          <span className="tooltiptext-header">{location.name}</span>
          {location.description}
          <br />
          {location.levelLimit && (
            <>
              Rec. Levels: {location.levelLimit.min} - {location.levelLimit.max}
              <br />
            </>
          )}
          {location.enemies && (
            <>
              Enemies:{' '}
              {location.enemies
                .map((enemy) => (enemy.discovered ? enemy.name : '???'))
                .join(', ')}
              <br />
            </>
          )}
        </>
      );
    }

    if (npc) {
      return (
        <>
          <span className="tooltiptext-header">{npc.name}</span>
          {npc.type.charAt(0).toUpperCase() + npc.type.slice(1)}
        </>
      );
    }
    if (enemy) {
      const displayInfo = enemy.killed >= 10 && enemy.discovered;

      const attackDamage = displayInfo
        ? enemy.attackDamage.min * 0.8 + ' - ' + enemy.attackDamage.max * 1.2
        : '???';
      const healthRange = displayInfo
        ? enemy.health * 0.8 + ' - ' + enemy.health * 1.2
        : '???';
      const manaRange = displayInfo
        ? enemy.mana * 0.8 + ' - ' + enemy.mana * 1.2
        : '???';
      const staminaRange = displayInfo
        ? enemy.stamina * 0.8 + ' - ' + enemy.stamina * 1.2
        : '???';

      let lootItems = null;
      if (enemy.loot) {
        lootItems = enemy.loot
          .map((lootItem) => {
            const item = lootItem.item;
            return item && item.discovered ? item.name : '???';
          })
          .join('<br>       ');
      }

      let skills = null;
      if (enemy.skills) {
        skills = enemy.skills
          .map((skill) => (skill.discovered ? skill.name : '???'))
          .join('<br>       ');
      }

      return (
        <>
          <span className="tooltiptext-header" style={{ minWidth: '300px;' }}>
            {enemy.name}
          </span>
          <span className="tooltiptext-seperator"></span>
          {enemy.description}
          <br />
          <br />
          <div className="enemy-tooltip-section-header">Stats:</div>
          <div className="enemy-tooltip-section-info">
            <div>Damage: {attackDamage}</div>
            <div>Health: {healthRange}</div>
            <div>Mana: {manaRange}</div>
            <div>Stamina: {staminaRange}</div>
          </div>
          <div className="enemy-tooltip-section-header">Loot:</div>
          <div
            className="enemy-tooltip-section-info"
            dangerouslySetInnerHTML={{ __html: lootItems || '???' }}
          />
          <div className="enemy-tooltip-section-header">Skills:</div>
          <div
            className="enemy-tooltip-section-info"
            dangerouslySetInnerHTML={{ __html: skills || '???' }}
          />
        </>
      );
    }
    return content;
  };

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      showTooltip(
        calculateContent(),
        {
          top: rect.bottom + 10,
          left: rect.left,
        },
        rect
      );
    }
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener('mouseenter', handleMouseEnter);
      trigger.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [item, location, npc, enemy]);

  return (
    <>
      <span className="tooltip-wrapper" ref={triggerRef}>
        {children}
      </span>
    </>
  );
};

export default Tooltip;

// import React, { useState, useRef, useEffect, useCallback } from 'react';

// const Tooltip = ({ children, content, item, location, npc, enemy }) => {
//   const [visible, setVisible] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0, tailLeft: 0 });
//   const [isAbove, setIsAbove] = useState(false);
//   const triggerRef = useRef(null);
//   const tooltipRef = useRef(null);

//   const calculatePosition = useCallback(() => {
//     if (!triggerRef.current || !tooltipRef.current) return;

//     const tooltipRect = tooltipRef.current.getBoundingClientRect();
//     const triggerRect = triggerRef.current.getBoundingClientRect();

//     let top = triggerRect.bottom + 10;
//     let left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
//     let tailLeft = triggerRect.left + triggerRect.width / 2 - left;

//     if (left < 10) {
//       tailLeft += left - 10; // Adjust tail position
//       left = 10;
//     } else if (left + tooltipRect.width > window.innerWidth - 10) {
//       tailLeft -= left + tooltipRect.width - window.innerWidth + 10; // Adjust tail position
//       left = window.innerWidth - tooltipRect.width - 10;
//     }

//     if (top + tooltipRect.height > window.innerHeight - 10) {
//       top = triggerRect.top - tooltipRect.height - 10;
//       setIsAbove(true);
//     } else {
//       setIsAbove(false);
//     }

//     setPosition({ top, left, tailLeft });
//   }, []);

//   const showTooltip = () => {
//     setVisible(true);
//   };

//   const hideTooltip = () => {
//     setVisible(false);
//   };

//   useEffect(() => {
//     const tooltipTrigger = triggerRef.current;

//     if (tooltipTrigger) {
//       tooltipTrigger.addEventListener('mouseenter', showTooltip);
//       tooltipTrigger.addEventListener('mouseleave', hideTooltip);

//       return () => {
//         tooltipTrigger.removeEventListener('mouseenter', showTooltip);
//         tooltipTrigger.removeEventListener('mouseleave', hideTooltip);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (visible) {
//       calculatePosition();
//     }
//   }, [visible, calculatePosition]);

//   const renderContent = () => {
//     if (item) {
//       return (
//         <>
//           <span className="tooltiptext-header">{item.name}</span>
//           {item.description}
//           <br />
//           <span className="tooltiptext-seperator"></span>
//           {item.minDamage != null && item.maxDamage != null && (
//             <>
//               Damage: {item.minDamage} - {item.maxDamage}
//               <br />
//             </>
//           )}
//           {item.attackSpeed != null && (
//             <>
//               Attack Speed: {item.attackSpeed}
//               <br />
//             </>
//           )}
//           {item.attackSpeed != null &&
//             item.minDamage != null &&
//             item.maxDamage != null && (
//               <>
//                 DPS:{' '}
//                 {(
//                   ((item.minDamage + item.maxDamage) / 2) *
//                   item.attackSpeed
//                 ).toFixed(2)}
//                 <br />
//               </>
//             )}
//           {item.critChance != null && (
//             <>
//               Crit Chance: {item.critChance}
//               <br />
//             </>
//           )}
//           {item.range != null && (
//             <>
//               Range: {item.range}
//               <br />
//             </>
//           )}
//           {item.attributes != null && item.attributes.defense != null && (
//             <>
//               Defense: {item.attributes.defense}
//               <br />
//             </>
//           )}
//           {item.attributes != null && item.attributes.bonusMagic != null && (
//             <>
//               Bonus Magic Damage: {item.attributes.bonusMagic}
//               <br />
//             </>
//           )}

//           {item.levelReq > 1 && (
//             <>
//               Level Requirement: {item.levelReq}
//               <br />
//             </>
//           )}
//           {item.attributeReq != null && (
//             <>
//               Attribute Requirement: {item.attributeReq}
//               <br />
//             </>
//           )}
//           {item.value != null && (
//             <>
//               Value: {item.value} gold
//               <br />
//             </>
//           )}
//         </>
//       );
//     }

//     if (location) {
//       return (
//         <>
//           <span className="tooltiptext-header">{location.name}</span>
//           {location.description}
//           <br />
//           {location.levelLimit && (
//             <>
//               Rec. Levels: {location.levelLimit.min} - {location.levelLimit.max}
//               <br />
//             </>
//           )}
//           {location.enemies && (
//             <>
//               Enemies:{' '}
//               {location.enemies
//                 .map((enemy) => (enemy.discovered ? enemy.name : '???'))
//                 .join(', ')}
//               <br />
//             </>
//           )}
//         </>
//       );
//     }

//     if (npc) {
//       return (
//         <>
//           <span className="tooltiptext-header">{npc.name}</span>
//           {npc.type.charAt(0).toUpperCase() + npc.type.slice(1)}
//         </>
//       );
//     }

//     if (enemy) {
//       const displayInfo = enemy.killed >= 10 && enemy.discovered;

//       const attackDamage = displayInfo
//         ? enemy.attackDamage.min * 0.8 + ' - ' + enemy.attackDamage.max * 1.2
//         : '???';
//       const healthRange = displayInfo
//         ? enemy.health * 0.8 + ' - ' + enemy.health * 1.2
//         : '???';
//       const manaRange = displayInfo
//         ? enemy.mana * 0.8 + ' - ' + enemy.mana * 1.2
//         : '???';
//       const staminaRange = displayInfo
//         ? enemy.stamina * 0.8 + ' - ' + enemy.stamina * 1.2
//         : '???';

//       let lootItems = null;
//       if (enemy.loot) {
//         lootItems = enemy.loot
//           .map((lootItem) => {
//             const item = lootItem.item;
//             return item && item.discovered ? item.name : '???';
//           })
//           .join('<br>       ');
//       }

//       let skills = null;
//       if (enemy.skills) {
//         skills = enemy.skills
//           .map((skill) => (skill.discovered ? skill.name : '???'))
//           .join('<br>       ');
//       }

//       return (
//         <>
//           <span className="tooltiptext-header" style={{ minWidth: '300px;' }}>
//             {enemy.name}
//           </span>
//           <span className="tooltiptext-seperator"></span>
//           {enemy.description}
//           <br />
//           <br />
//           <div className="enemy-tooltip-section-header">Stats:</div>
//           <div className="enemy-tooltip-section-info">
//             <div>Damage: {attackDamage}</div>
//             <div>Health: {healthRange}</div>
//             <div>Mana: {manaRange}</div>
//             <div>Stamina: {staminaRange}</div>
//           </div>
//           <div className="enemy-tooltip-section-header">Loot:</div>
//           <div
//             className="enemy-tooltip-section-info"
//             dangerouslySetInnerHTML={{ __html: lootItems || '???' }}
//           />
//           <div className="enemy-tooltip-section-header">Skills:</div>
//           <div
//             className="enemy-tooltip-section-info"
//             dangerouslySetInnerHTML={{ __html: skills || '???' }}
//           />
//         </>
//       );
//     }
//   };

//   return (
//     <>
//       <span className="tooltippopup-child-wrapper" ref={triggerRef}>
//         {children}
//       </span>
//       {visible && (
//         <div
//           ref={tooltipRef}
//           className="tooltippopup"
//           style={{ top: `${position.top}px`, left: `${position.left}px` }}
//         >
//           {renderContent()}
//           <div
//             className={`tooltip-tail ${
//               isAbove ? 'tooltip-tail-above' : 'tooltip-tail-below'
//             }`}
//             style={{ left: `${position.tailLeft}px` }}
//           ></div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Tooltip;
