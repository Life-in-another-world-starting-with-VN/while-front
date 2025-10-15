import React from 'react';
import type { Choice } from '../../../../types/game';
import { ChoiceContainer, ChoiceButton } from './styled';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choiceId: string) => void;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoiceSelect }) => {
  return (
    <ChoiceContainer>
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.id}
          onClick={() => onChoiceSelect(choice.id)}
        >
          {choice.text}
        </ChoiceButton>
      ))}
    </ChoiceContainer>
  );
};

export default ChoiceButtons;
