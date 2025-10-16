import React from 'react';
import SaveSlot from '../SaveSlot';
import {
  RightSection,
  SaveSlotsGrid,
  QuickSaveInfo,
} from './styled';
import type { SaveSlotData } from '../../index';



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


    </RightSection>
  );
};

export default LoadGameContent;