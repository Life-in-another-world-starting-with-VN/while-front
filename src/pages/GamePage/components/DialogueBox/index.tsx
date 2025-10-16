import React from 'react';
import { DialogueBoxContainer, CharacterName, DialogueText } from './styled';

interface DialogueBoxProps {
  characterName: string;
  characterColor?: string;
  text: string;
  onClick?: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  characterName,
  characterColor,
  text,
  onClick,
}) => {
  return (
    <DialogueBoxContainer onClick={onClick}>
      <CharacterName color={characterColor}>{characterName}</CharacterName>
      <DialogueText>{text}</DialogueText>
    </DialogueBoxContainer>
  );
};

export default DialogueBox;
