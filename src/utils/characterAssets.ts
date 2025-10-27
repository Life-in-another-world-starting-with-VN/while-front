import type { CharacterId, CharacterExpression } from '../types/character';

// Import all character images
// Character 1
import char1Default from '../assets/MainCharacter/1.png';
import char1Anger from '../assets/MainCharacter/1_anger.png';
import char1Laugh from '../assets/MainCharacter/1_laugh.png';
import char1Smile from '../assets/MainCharacter/1_smile.png';
import char1Sad from '../assets/MainCharacter/1_sad.png';
import char1Worry from '../assets/MainCharacter/1_worry.png';
import char1Embarrassed from '../assets/MainCharacter/1_embarrassed.png';
import char1Blush from '../assets/MainCharacter/1_blush.png';
import char1Thinking from '../assets/MainCharacter/1_thinking.png';
import char1Surprise from '../assets/MainCharacter/1_surprise.png';

// Character 2
import char2Default from '../assets/MainCharacter/2.png';
import char2Anger from '../assets/MainCharacter/2_anger.png';
import char2Laugh from '../assets/MainCharacter/2_laugh.png';
import char2Smile from '../assets/MainCharacter/2_smile.png';
import char2Sad from '../assets/MainCharacter/2_sad.png';
import char2Worry from '../assets/MainCharacter/2_worry.png';
import char2Embarrassed from '../assets/MainCharacter/2_embarrassed.png';
import char2Blush from '../assets/MainCharacter/2_blush.png';
import char2Thinking from '../assets/MainCharacter/2_thinking.png';
import char2Surprise from '../assets/MainCharacter/2_suprise.png';

// Character 3
import char3Default from '../assets/MainCharacter/3.png';
import char3Anger from '../assets/MainCharacter/3_anger.png';
import char3Laugh from '../assets/MainCharacter/3_laugh.png';
import char3Smile from '../assets/MainCharacter/3_smile.png';
import char3Sad from '../assets/MainCharacter/3_sad.png';
import char3Worry from '../assets/MainCharacter/3_worry.png';
import char3Embarrassed from '../assets/MainCharacter/3_ambarrased.png';
import char3Blush from '../assets/MainCharacter/3_blush.png';
import char3Thinking from '../assets/MainCharacter/3_thinking.png';
import char3Surprise from '../assets/MainCharacter/3_suprise.png';

// Character image mapping
const CHARACTER_IMAGES: Record<CharacterId, Record<CharacterExpression | 'default', string>> = {
  '1': {
    default: char1Default,
    anger: char1Anger,
    laugh: char1Laugh,
    smile: char1Smile,
    sad: char1Sad,
    worry: char1Worry,
    embarrassed: char1Embarrassed,
    blush: char1Blush,
    thinking: char1Thinking,
    surprise: char1Surprise,
  },
  '2': {
    default: char2Default,
    anger: char2Anger,
    laugh: char2Laugh,
    smile: char2Smile,
    sad: char2Sad,
    worry: char2Worry,
    embarrassed: char2Embarrassed,
    blush: char2Blush,
    thinking: char2Thinking,
    surprise: char2Surprise,
  },
  '3': {
    default: char3Default,
    anger: char3Anger,
    laugh: char3Laugh,
    smile: char3Smile,
    sad: char3Sad,
    worry: char3Worry,
    embarrassed: char3Embarrassed,
    blush: char3Blush,
    thinking: char3Thinking,
    surprise: char3Surprise,
  },
};

/**
 * Get character image based on character ID and expression
 */
export function getCharacterImage(
  characterId: CharacterId,
  expression: CharacterExpression = 'smile'
): string {
  const characterImages = CHARACTER_IMAGES[characterId];
  return characterImages?.[expression] || characterImages?.default || char1Default;
}

/**
 * Get character ID from character name using hash
 * This ensures consistent character assignment
 */
export function getCharacterIdFromName(characterName: string): CharacterId {
  const nameHash = characterName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const ids: CharacterId[] = ['1', '2', '3'];
  return ids[nameHash % ids.length];
}

/**
 * Preload all character images for smooth transitions
 */
export function preloadCharacterImages(): Promise<void[]> {
  const allImages: string[] = [];

  Object.values(CHARACTER_IMAGES).forEach(characterExpressions => {
    Object.values(characterExpressions).forEach(imageUrl => {
      allImages.push(imageUrl);
    });
  });

  const preloadPromises = allImages.map(imageUrl => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
      img.src = imageUrl;
    });
  });

  return Promise.all(preloadPromises);
}
