import React from 'react';
import SaveSlot from '../SaveSlot';
import {
  RightSection,
  SaveSlotsGrid,
  QuickSaveInfo,
} from './styled';
import { SaveSlotData } from '../../index'; 

interface LoadGameContentProps {
  saveSlots: SaveSlotData[];
  onSlotClick: (slotNumber: number, saveId?: string) => void;
}

const LoadGameContent: React.FC<LoadGameContentProps> = ({
  saveSlots,
  onSlotClick,
}) => {

  return (
    <RightSection>
      <SaveSlotsGrid>
        {saveSlots.map((slot) => (
          <SaveSlot
            key={slot.slotNumber}
            slotNumber={slot.slotNumber}
            title={slot.title}
            timestamp={slot.timestamp}
            isEmpty={slot.isEmpty}
            onClick={() => onSlotClick(slot.slotNumber, slot.saveId)} 
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