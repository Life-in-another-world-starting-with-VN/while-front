import React from 'react';
import SaveSlot from '../SaveSlot';
import {
  RightSection,
  SaveSlotsGrid,
  QuickSaveInfo,
} from './styled';

interface SaveData {
  slotNumber: number;
  title?: string;
  timestamp?: string;
  isEmpty?: boolean;
}

interface LoadGameContentProps {
  saveSlots?: SaveData[];
  onSlotClick?: (slotNumber: number) => void;
}

const LoadGameContent: React.FC<LoadGameContentProps> = ({
  saveSlots = [],
  onSlotClick,
}) => {
  const defaultSlots: SaveData[] = Array.from({ length: 6 }, (_, index) => ({
    slotNumber: index + 1,
    isEmpty: true,
  }));

  const slots = saveSlots.length > 0 ? saveSlots : defaultSlots;

  return (
    <RightSection>
      <SaveSlotsGrid>
        {slots.map((slot) => (
          <SaveSlot
            key={slot.slotNumber}
            slotNumber={slot.slotNumber}
            title={slot.title}
            timestamp={slot.timestamp}
            isEmpty={slot.isEmpty}
            onClick={() => onSlotClick?.(slot.slotNumber)}
          />
        ))}
      </SaveSlotsGrid>

      <QuickSaveInfo>
        ( 자동 퀵 1 2 3 4 5 6 7 8 9 )
      </QuickSaveInfo>
    </RightSection>
  );
};

export default LoadGameContent;