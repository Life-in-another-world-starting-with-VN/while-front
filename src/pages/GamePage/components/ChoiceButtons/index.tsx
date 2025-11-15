import React from 'react';
import type { Choice } from '../../../../types/game';
import { ChoiceContainer, ChoiceButton } from './styled';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choiceId: string) => void;
}

// Maximum number of choices to display (2-3 choices)
const MAX_CHOICES = 3;

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoiceSelect }) => {
  // Limit choices to MAX_CHOICES (2-3 options)
  const limitedChoices = choices.slice(0, MAX_CHOICES);

  return (
    <ChoiceContainer>
      {limitedChoices.map((choice) => (
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
