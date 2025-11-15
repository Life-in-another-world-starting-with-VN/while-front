// Character Expression Types

export type CharacterExpression =
  | 'anger'      // 화남
  | 'laugh'      // 웃음
  | 'smile'      // 미소
  | 'sad'        // 슬픔
  | 'worry'      // 걱정
  | 'embarrassed' // 당황
  | 'blush'      // 부끄러움
  | 'thinking'   // 생각
  | 'surprise';  // 놀람

export type CharacterId = '1' | '2' | '3';

// Character Personality Types
export type CharacterPersonality =
  | 'tsundere'      // 츠데레 - 겉으로는 차갑지만 속으론 다정
  | 'cheerful'      // 활발함 - 밝고 긍정적
  | 'shy'           // 수줍음 - 내성적이고 부끄러움 많음
  | 'cool'          // 쿨함 - 냉정하고 차가움
  | 'gentle'        // 온화함 - 부드럽고 상냥함
  | 'energetic'     // 에너지 넘침 - 활동적이고 열정적
  | 'serious'       // 진지함 - 성실하고 무뚝뚝
  | 'playful'       // 장난스러움 - 유쾌하고 재미있음
  | 'mysterious'    // 신비로움 - 알 수 없고 조용함
  | 'innocent'      // 순수함 - 천진난만하고 순수
  | 'confident';    // 자신감 - 당당하고 자신있음

export interface CharacterState {
  id: CharacterId;
  name: string;
  expression: CharacterExpression;
  personality?: CharacterPersonality;
}

// Emotion keywords mapping to expressions
export const EMOTION_KEYWORDS: Record<CharacterExpression, string[]> = {
  anger: [
    '화', '짜증', '분노', '열받', '빡', '욕', '싫', '미워', '증오',
    '빡치', '짜증나', '화나', '열받아', '짜증스러', '싫어', '미쳤',
    '미친', '죽', '때리', '무섭', '나쁜', '악', '흥분', '격노'
  ],
  laugh: [
    '하하', '호호', '히히', '크크', '푸하하', '웃', '재밌', '즐거',
    '신나', '기뻐', '행복', '좋아', '최고', '완전', '대박', '쾌감',
    '신남', '즐거움', '유쾌', '명랑', '활기', '우와', '야호'
  ],
  smile: [
    '미소', '좋', '괜찮', '응', '네', '고마', '감사', '다행', '반가',
    '기분 좋', '만족', '평화', '따뜻', '포근', '편안', '안심', '흡족',
    '기쁘', '훈훈', '행복해', '좋네', '멋져', '예뻐', '사랑', '좋아해'
  ],
  sad: [
    '슬', '눈물', '우', '울', '힘들', '외로', '쓸쓸', '고독', '서러',
    '불행', '아프', '괴로', '비참', '절망', '우울', '암울', '침울',
    '슬픔', '서글', '눈물나', '가슴 아', '마음 아', '상처', '아픈'
  ],
  worry: [
    '걱정', '불안', '두렵', '무서', '겁', '염려', '근심', '초조',
    '위험', '조심', '신경', '긴장', '떨', '주저', '망설', '겁나',
    '불안해', '걱정돼', '두려워', '무서워', '조마조마', '떨려', '긴장돼'
  ],
  embarrassed: [
    '당황', '어색', '곤란', '난처', '쩔쩔', '버벅', '혼란', '당혹',
    '어리둥절', '황당', '어이없', '멍', '헷갈', '이상해', '뭐야',
    '어떡해', '난감', '어색해', '당황스러', '헛', '머쓱', '뭐지'
  ],
  blush: [
    '부끄', '얼굴', '빨개', '쑥스', '민망', '창피', '낯간지럽', '수줍',
    '얼굴 붉', '홍조', '부그', '샤이', '얼굴 뜨거', '빨개졌',
    '부끄러워', '쑥스러워', '민망해', '창피해', '얼굴이', '뺨이'
  ],
  thinking: [
    '생각', '음', '글쎄', '어디', '무엇', '왜', '어떻게', '흠', '궁금',
    '고민', '머리', '이해', '알', '모르', '어떤', '뭘', '생각해',
    '고민돼', '궁금해', '모르겠', '아리송', '복잡', '고민스러', '생각중'
  ],
  surprise: [
    '놀', '깜짝', '어머', '헉', '와', '우와', '오', '세상', '대단',
    '충격', '믿', '진짜', '정말', '엄청', '허', '허걱', '이럴수가',
    '놀라워', '깜짝이야', '깜놀', '경악', '아니', '헐', '허걱'
  ],
};

// Default expression when no emotion is detected
export const DEFAULT_EXPRESSION: CharacterExpression = 'smile';

// Personality-based default expressions
export const PERSONALITY_DEFAULT_EXPRESSIONS: Record<CharacterPersonality, CharacterExpression> = {
  tsundere: 'thinking',      // 츤데레 - 무표정/생각하는 표정
  cheerful: 'smile',         // 활발함 - 미소
  shy: 'embarrassed',        // 수줍음 - 부끄러움
  cool: 'thinking',          // 쿨함 - 무표정/생각
  gentle: 'smile',           // 온화함 - 미소
  energetic: 'laugh',        // 에너지 넘침 - 웃음
  serious: 'thinking',       // 진지함 - 생각
  playful: 'laugh',          // 장난스러움 - 웃음
  mysterious: 'thinking',    // 신비로움 - 생각
  innocent: 'smile',         // 순수함 - 미소
  confident: 'smile',        // 자신감 - 미소
};

// Personality keywords for AI analysis
export const PERSONALITY_KEYWORDS: Record<CharacterPersonality, string[]> = {
  tsundere: ['츤데레', '차가운', '쌀쌀맞', '퉁명스러', '무뚝뚝', '쿨내', '겉은차갑', '속은따뜻'],
  cheerful: ['활발', '밝', '긍정', '명랑', '쾌활', '발랄', '활기'],
  shy: ['수줍', '내성적', '소심', '조용', '말수적', '부끄', '수줍음'],
  cool: ['쿨', '냉정', '차가운', '이성적', '감정없', '침착', '냉철'],
  gentle: ['온화', '상냥', '다정', '부드러운', '따뜻', '친절', '자상'],
  energetic: ['에너지', '활동적', '열정', '적극', '원기왕성', '힘찬'],
  serious: ['진지', '성실', '근엄', '무표정', '딱딱', '엄격'],
  playful: ['장난', '유쾌', '재밌', '익살', '코믹', '농담'],
  mysterious: ['신비', '미스터리', '알수없', '수수께끼', '비밀'],
  innocent: ['순수', '천진', '순진', '어린아이', '맑은'],
  confident: ['자신감', '당당', '확신', '자신있', '떳떳', '자부심'],
};
