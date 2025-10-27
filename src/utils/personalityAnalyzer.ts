import {
  PERSONALITY_KEYWORDS,
  PERSONALITY_DEFAULT_EXPRESSIONS,
  DEFAULT_EXPRESSION,
  type CharacterPersonality,
  type CharacterExpression
} from '../types/character';

/**
 * AI-powered personality analyzer
 * Analyzes character description/personality text to determine character type
 */
export function analyzePersonality(personalityText: string): CharacterPersonality | null {
  if (!personalityText || personalityText.trim().length === 0) {
    return null;
  }

  const normalizedText = personalityText.toLowerCase().trim();
  const scores: Record<CharacterPersonality, number> = {
    tsundere: 0,
    cheerful: 0,
    shy: 0,
    cool: 0,
    gentle: 0,
    energetic: 0,
    serious: 0,
    playful: 0,
    mysterious: 0,
    innocent: 0,
    confident: 0,
  };

  // Count keyword matches for each personality type
  Object.entries(PERSONALITY_KEYWORDS).forEach(([personality, keywords]) => {
    keywords.forEach(keyword => {
      if (normalizedText.includes(keyword)) {
        scores[personality as CharacterPersonality] += 1;
      }
    });
  });

  // Find personality with highest score
  const entries = Object.entries(scores) as [CharacterPersonality, number][];
  const topPersonality = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // Return detected personality if score > 0, otherwise null
  return topPersonality[1] > 0 ? topPersonality[0] : null;
}

/**
 * Get default expression based on personality
 */
export function getDefaultExpressionForPersonality(
  personality?: CharacterPersonality | string | null
): CharacterExpression {
  if (!personality) {
    return DEFAULT_EXPRESSION;
  }

  // Handle string personality
  if (typeof personality === 'string') {
    const analyzedPersonality = analyzePersonality(personality);
    if (analyzedPersonality) {
      return PERSONALITY_DEFAULT_EXPRESSIONS[analyzedPersonality];
    }
  }

  // Handle typed personality
  if (personality in PERSONALITY_DEFAULT_EXPRESSIONS) {
    return PERSONALITY_DEFAULT_EXPRESSIONS[personality as CharacterPersonality];
  }

  return DEFAULT_EXPRESSION;
}

/**
 * Get personality with confidence score
 */
export function analyzePersonalityWithConfidence(personalityText: string): {
  personality: CharacterPersonality | null;
  confidence: number;
  scores: Record<CharacterPersonality, number>;
} {
  if (!personalityText || personalityText.trim().length === 0) {
    return {
      personality: null,
      confidence: 0,
      scores: {
        tsundere: 0,
        cheerful: 0,
        shy: 0,
        cool: 0,
        gentle: 0,
        energetic: 0,
        serious: 0,
        playful: 0,
        mysterious: 0,
        innocent: 0,
        confident: 0,
      },
    };
  }

  const normalizedText = personalityText.toLowerCase().trim();
  const scores: Record<CharacterPersonality, number> = {
    tsundere: 0,
    cheerful: 0,
    shy: 0,
    cool: 0,
    gentle: 0,
    energetic: 0,
    serious: 0,
    playful: 0,
    mysterious: 0,
    innocent: 0,
    confident: 0,
  };

  let totalMatches = 0;

  // Count keyword matches
  Object.entries(PERSONALITY_KEYWORDS).forEach(([personality, keywords]) => {
    keywords.forEach(keyword => {
      if (normalizedText.includes(keyword)) {
        scores[personality as CharacterPersonality] += 1;
        totalMatches += 1;
      }
    });
  });

  // Find top personality
  const entries = Object.entries(scores) as [CharacterPersonality, number][];
  const topPersonality = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  // Calculate confidence
  const confidence = totalMatches > 0 ? topPersonality[1] / totalMatches : 0;

  return {
    personality: topPersonality[1] > 0 ? topPersonality[0] : null,
    confidence,
    scores,
  };
}

/**
 * Get personality display name in Korean
 */
export function getPersonalityDisplayName(personality: CharacterPersonality): string {
  const displayNames: Record<CharacterPersonality, string> = {
    tsundere: '츤데레',
    cheerful: '활발함',
    shy: '수줍음',
    cool: '쿨함',
    gentle: '온화함',
    energetic: '에너지 넘침',
    serious: '진지함',
    playful: '장난스러움',
    mysterious: '신비로움',
    innocent: '순수함',
    confident: '자신감',
  };

  return displayNames[personality];
}

/**
 * Get personality description
 */
export function getPersonalityDescription(personality: CharacterPersonality): string {
  const descriptions: Record<CharacterPersonality, string> = {
    tsundere: '겉으로는 차갑지만 속으로는 다정한 성격',
    cheerful: '밝고 긍정적인 성격',
    shy: '내성적이고 부끄러움이 많은 성격',
    cool: '냉정하고 차가운 성격',
    gentle: '부드럽고 상냥한 성격',
    energetic: '활동적이고 열정적인 성격',
    serious: '성실하고 진지한 성격',
    playful: '유쾌하고 장난스러운 성격',
    mysterious: '알 수 없고 신비로운 성격',
    innocent: '천진난만하고 순수한 성격',
    confident: '당당하고 자신있는 성격',
  };

  return descriptions[personality];
}
