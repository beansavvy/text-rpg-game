import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface UIActionDependencies {
  setItemPopupOpen: Dispatch<SetStateAction<boolean>>;
  setItemPopupSlot: Dispatch<SetStateAction<string | null>>;
  setPopupCharacterId: Dispatch<SetStateAction<string | null>>;
  setTooltipContent: Dispatch<SetStateAction<ReactNode>>;
  setTooltipPosition: Dispatch<SetStateAction<{ top: number; left: number }>>;
  setTooltipVisible: Dispatch<SetStateAction<boolean>>;
  setTooltipTailPosition: Dispatch<SetStateAction<number>>;
  setIsAbove: Dispatch<SetStateAction<boolean>>;
}

export const createUIActions = ({
  setItemPopupOpen,
  setItemPopupSlot,
  setPopupCharacterId,
  setTooltipContent,
  setTooltipPosition,
  setTooltipVisible,
  setTooltipTailPosition,
  setIsAbove,
}: UIActionDependencies) => ({
  openItemPopup: (slot: string, characterId: string) => {
    setItemPopupSlot(slot);
    setPopupCharacterId(characterId);
    setItemPopupOpen(true);
  },

  closeItemPopup: () => {
    setItemPopupOpen(false);
    setItemPopupSlot(null);
    setPopupCharacterId(null);
  },

  showTooltip: (
    content: ReactNode,
    position: { top: number; left: number },
    triggerRect: DOMRect
  ) => {
    const tooltipWidth = 300;
    const viewportPadding = 5;

    let left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
    let top = position.top;
    let tailLeft = tooltipWidth / 2;

    if (left < viewportPadding) {
      tailLeft += left - viewportPadding;
      left = viewportPadding;
    } else if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      tailLeft -= left + tooltipWidth - (window.innerWidth - viewportPadding);
      left = window.innerWidth - tooltipWidth - viewportPadding;
    }

    if (top + 150 > window.innerHeight) {
      top = triggerRect.top - 10;
      setIsAbove(true);
    } else {
      setIsAbove(false);
    }

    setTooltipContent(content);
    setTooltipPosition({ top, left });
    setTooltipTailPosition(tailLeft);
    setTooltipVisible(true);
  },

  hideTooltip: () => {
    setTooltipVisible(false);
    setTooltipContent(null);
  },
});
