import React, { useState, useEffect } from 'react';
import { SpriteContainer, SpriteImage } from './styled';
import type { CharacterExpression, CharacterId } from '../../../../types/character';
import { getCharacterImage } from '../../../../utils/characterAssets';
import { getCharacterSize, subscribeToSettings } from '../../../../utils/settingsStorage';

interface CharacterSpriteProps {
  characterId: CharacterId;
  characterName: string;
  expression?: CharacterExpression;
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  characterName,
  expression = 'smile',
}) => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [characterSize, setCharacterSize] = useState<number>(() => getCharacterSize());

  // Subscribe to character size changes from settings
  useEffect(() => {
    const unsubscribe = subscribeToSettings((settings) => {
      if (settings.characterSize !== undefined) {
        setCharacterSize(settings.characterSize);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the appropriate character image based on expression
    const newImage = getCharacterImage(characterId, expression);

    // Smooth transition effect
    if (currentImage && newImage !== currentImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage(newImage);
        setIsTransitioning(false);
      }, 150);
    } else {
      setCurrentImage(newImage);
    }
  }, [characterId, expression, currentImage]);

  if (!currentImage) return null;

  // Calculate scale based on character size setting (50-150%)
  const scale = characterSize / 100;

  return (
    <SpriteContainer>
      <SpriteImage
        src={currentImage}
        alt={`${characterName} - ${expression}`}
        style={{
          opacity: isTransitioning ? 0.7 : 1,
          transform: `scale(${scale})`,
          transition: 'opacity 0.15s ease-in-out, transform 0.3s ease-in-out'
        }}
      />
    </SpriteContainer>
  );
};

export default CharacterSprite;
