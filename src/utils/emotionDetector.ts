import {
  EMOTION_KEYWORDS,
  type CharacterExpression,
  type CharacterPersonality
} from '../types/character';
import { getDefaultExpressionForPersonality } from './personalityAnalyzer';

/**
 * Detects emotion from dialogue text using keyword matching
 * Returns the most prominent emotion found in the text
 *
 * @param text - Dialogue text to analyze
 * @param personality - Character personality (optional) - affects default expression
 */
export function detectEmotion(
  text: string,
  personality?: CharacterPersonality | string | null
): CharacterExpression {
  if (!text || text.trim().length === 0) {
    return getDefaultExpressionForPersonality(personality);
  }

  const normalizedText = text.toLowerCase().trim();
  const emotionScores: Record<CharacterExpression, number> = {
    anger: 0,
    laugh: 0,
    smile: 0,
    sad: 0,
    worry: 0,
    embarrassed: 0,
    blush: 0,
    thinking: 0,
    surprise: 0,
  };

  // Count keyword matches for each emotion
  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'g');
      const matches = normalizedText.match(regex);
      if (matches) {
        emotionScores[emotion as CharacterExpression] += matches.length;
      }
    });
  });

  // Find emotion with highest score
  const emotions = Object.entries(emotionScores) as [CharacterExpression, number][];
  const topEmotion = emotions.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // Return detected emotion if score > 0, otherwise personality-based default
  return topEmotion[1] > 0 ? topEmotion[0] : getDefaultExpressionForPersonality(personality);
}

/**
 * Detects emotion with confidence score
 *
 * @param text - Dialogue text to analyze
 * @param personality - Character personality (optional) - affects default expression
 */
export function detectEmotionWithConfidence(
  text: string,
  personality?: CharacterPersonality | string | null
): {
  emotion: CharacterExpression;
  confidence: number;
  scores: Record<CharacterExpression, number>;
} {
  if (!text || text.trim().length === 0) {
    return {
      emotion: getDefaultExpressionForPersonality(personality),
      confidence: 0,
      scores: {
        anger: 0,
        laugh: 0,
        smile: 0,
        sad: 0,
        worry: 0,
        embarrassed: 0,
        blush: 0,
        thinking: 0,
        surprise: 0,
      },
    };
  }

  const normalizedText = text.toLowerCase().trim();
  const emotionScores: Record<CharacterExpression, number> = {
    anger: 0,
    laugh: 0,
    smile: 0,
    sad: 0,
    worry: 0,
    embarrassed: 0,
    blush: 0,
    thinking: 0,
    surprise: 0,
  };

  // Count keyword matches for each emotion
  let totalMatches = 0;
  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'g');
      const matches = normalizedText.match(regex);
      if (matches) {
        emotionScores[emotion as CharacterExpression] += matches.length;
        totalMatches += matches.length;
      }
    });
  });

  // Find emotion with highest score
  const emotions = Object.entries(emotionScores) as [CharacterExpression, number][];
  const topEmotion = emotions.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // Calculate confidence (0-1)
  const confidence = totalMatches > 0 ? topEmotion[1] / totalMatches : 0;

  return {
    emotion: topEmotion[1] > 0 ? topEmotion[0] : getDefaultExpressionForPersonality(personality),
    confidence,
    scores: emotionScores,
  };
}

/**
 * Get expression history for smooth transitions
 * Uses recent emotions to prevent rapid expression changes
 */
export class ExpressionHistory {
  private history: CharacterExpression[] = [];
  private maxHistory = 3;

  addExpression(expression: CharacterExpression): void {
    this.history.push(expression);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  getStableExpression(newExpression: CharacterExpression): CharacterExpression {
    // If new expression appears in recent history, use it
    // This prevents rapid flickering between expressions
    if (this.history.includes(newExpression)) {
      return newExpression;
    }

    // If history is empty or new expression is strong, use new one
    if (this.history.length === 0) {
      return newExpression;
    }

    // Otherwise, keep most recent expression for stability
    return this.history[this.history.length - 1];
  }

  clear(): void {
    this.history = [];
  }
}
