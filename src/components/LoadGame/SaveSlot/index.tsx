import React from 'react';
import {
  SaveSlotContainer,
  SaveSlotContent,
  SaveSlotTitle,
  SaveSlotInfo,
} from './styled';

interface SaveSlotProps {
  slotNumber: number;
  title?: string;
  timestamp?: string;
  isEmpty?: boolean;
  onClick?: () => void;
}

const SaveSlot: React.FC<SaveSlotProps> = ({
  slotNumber,
  title,
  timestamp,
  isEmpty = true,
  onClick,
}) => {
  return (
    <SaveSlotContainer onClick={onClick}>
      <SaveSlotContent>
        {isEmpty ? (
          <SaveSlotTitle></SaveSlotTitle>
        ) : (
          <>
            <SaveSlotTitle>{title || `저장 파일 ${slotNumber}`}</SaveSlotTitle>
            <SaveSlotInfo>{timestamp}</SaveSlotInfo>
          </>
        )}
      </SaveSlotContent>
    </SaveSlotContainer>
  );
};

export default SaveSlot;