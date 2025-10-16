import React from 'react';
import { SpriteContainer, SpriteImage } from './styled';

interface CharacterSpriteProps {
  sprite?: string;
  characterName: string;
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  sprite,
  characterName,
}) => {
  if (!sprite) return null;

  return (
    <SpriteContainer>
      <SpriteImage src={sprite} alt={characterName} />
    </SpriteContainer>
  );
};

export default CharacterSprite;
