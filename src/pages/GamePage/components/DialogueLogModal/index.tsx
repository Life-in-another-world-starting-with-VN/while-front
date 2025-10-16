import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  LogContent,
  LogItem,
  CharacterName,
  DialogueText,
  EmptyMessage,
} from './styled';

interface DialogueLogItem {
  characterName: string;
  characterColor?: string;
  text: string;
}

interface DialogueLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  dialogueLog: DialogueLogItem[];
}

const DialogueLogModal: React.FC<DialogueLogModalProps> = ({
  isOpen,
  onClose,
  dialogueLog,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>대사록</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <LogContent>
          {dialogueLog.length === 0 ? (
            <EmptyMessage>아직 대사가 없습니다.</EmptyMessage>
          ) : (
            dialogueLog.map((item, index) => (
              <LogItem key={index}>
                <CharacterName color={item.characterColor}>
                  {item.characterName}
                </CharacterName>
                <DialogueText>{item.text}</DialogueText>
              </LogItem>
            ))
          )}
        </LogContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DialogueLogModal;
