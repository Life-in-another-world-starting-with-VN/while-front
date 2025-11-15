# AI 기반 성격별 기본 표정 시스템

## 개요
캐릭터의 성격(personality)을 AI가 자동으로 분석하여 적절한 기본 표정을 결정하는 시스템입니다.

## 주요 기능

### 1. AI 성격 분석
- 캐릭터 성격 텍스트를 자동으로 분석
- 11가지 성격 유형 중 가장 적합한 성격 선택
- 신뢰도 점수 계산

### 2. 성격별 기본 표정
각 성격마다 어울리는 기본 표정이 자동으로 설정됩니다.

| 성격 | 기본 표정 | 설명 |
|------|----------|------|
| 츤데레 (tsundere) | 🤔 thinking | 겉으로는 차갑지만 속으로는 다정 |
| 활발함 (cheerful) | 😊 smile | 밝고 긍정적 |
| 수줍음 (shy) | 😳 embarrassed | 내성적이고 부끄러움 많음 |
| 쿨함 (cool) | 🤔 thinking | 냉정하고 차가움 |
| 온화함 (gentle) | 😊 smile | 부드럽고 상냥함 |
| 에너지 넘침 (energetic) | 😄 laugh | 활동적이고 열정적 |
| 진지함 (serious) | 🤔 thinking | 성실하고 무뚝뚝 |
| 장난스러움 (playful) | 😄 laugh | 유쾌하고 재미있음 |
| 신비로움 (mysterious) | 🤔 thinking | 알 수 없고 조용함 |
| 순수함 (innocent) | 😊 smile | 천진난만하고 순수 |
| 자신감 (confident) | 😊 smile | 당당하고 자신있음 |

### 3. 작동 방식
```
감정 감지 우선순위:
1. API에서 지정한 표정 (emotion)
2. 텍스트에서 감지된 감정
3. 성격에 따른 기본 표정 ← NEW!
4. 일반 기본 표정 (smile)
```

## 사용 예시

### 예시 1: 츤데레 캐릭터
```typescript
게임 생성:
personality: "츤데레"

대사 1: "뭐야..."
→ 감정 키워드 없음 → 츤데레 기본 표정 → thinking (무표정)

대사 2: "하지만... 고마워."
→ "고마워" 감지 → smile (미소)
```

### 예시 2: 활발한 캐릭터
```typescript
게임 생성:
personality: "활발하고 밝은 성격"

대사 1: "안녕!"
→ 감정 키워드 없음 → 활발함 기본 표정 → smile (미소)

대사 2: "하하하! 재밌어!"
→ "하하하" 감지 → laugh (웃음)
```

### 예시 3: 수줍은 캐릭터
```typescript
게임 생성:
personality: "수줍음이 많고 내성적"

대사 1: "음..."
→ 감정 키워드 없음 → 수줍음 기본 표정 → embarrassed (부끄러움)

대사 2: "부끄러워..."
→ "부끄러워" 감지 → blush (부끄러움)
```

## 기술 구현

### 1. 성격 분석 AI
```typescript
// src/utils/personalityAnalyzer.ts

// 성격 키워드 분석
analyzePersonality("츤데레")
→ 'tsundere'

analyzePersonality("밝고 활발한 성격")
→ 'cheerful'

analyzePersonality("차가운 성격")
→ 'cool'
```

### 2. 기본 표정 결정
```typescript
// 성격에 맞는 기본 표정 반환
getDefaultExpressionForPersonality('tsundere')
→ 'thinking'

getDefaultExpressionForPersonality('cheerful')
→ 'smile'
```

### 3. 통합 사용
```typescript
// 감정 감지 시 성격 정보 전달
const expression = detectEmotion(
  "...",                    // 대사
  "츤데레"                  // 성격 (옵션)
);
// → 감정 없으면 'thinking' 반환
```

## 백엔드 연동

### 방법 1: 게임 생성 시 성격 지정
```json
POST /api/v1/games
{
  "personality": "츤데레",
  "genre": "로맨스",
  "playtime": 30
}
```

프론트엔드에서 자동으로 사용:
```typescript
// GamePage에서 자동으로 personality 추출
const personality = currentGame?.personality;
const expression = detectEmotion(text, personality);
```

### 방법 2: 각 대사마다 성격 지정 (세밀한 제어)
```json
{
  "dialogues": [
    {
      "text_template": "...",
      "character_name": "주인공",
      "character_personality": "츤데레"
    }
  ]
}
```

### 방법 3: 백엔드 AI가 성격 분석
백엔드에서 AI가 분석한 성격을 전달:
```json
{
  "dialogues": [
    {
      "text_template": "...",
      "character_name": "여주인공",
      "character_personality": "tsundere",  // AI가 분석한 결과
      "emotion": null                       // 표정은 자동 감지
    }
  ]
}
```

## 성격 키워드

각 성격별로 AI가 감지하는 키워드:

### 츤데레
```
'츤데레', '차가운', '쌀쌀맞', '퉁명스러', '무뚝뚝', '쿨내'
```

### 활발함
```
'활발', '밝', '긍정', '명랑', '쾌활', '발랄', '활기'
```

### 수줍음
```
'수줍', '내성적', '소심', '조용', '말수적', '부끄'
```

### 쿨함
```
'쿨', '냉정', '차가운', '이성적', '감정없', '침착', '냉철'
```

### 온화함
```
'온화', '상냥', '다정', '부드러운', '따뜻', '친절', '자상'
```

### 에너지 넘침
```
'에너지', '활동적', '열정', '적극', '원기왕성', '힘찬'
```

### 진지함
```
'진지', '성실', '근엄', '무표정', '딱딱', '엄격'
```

### 장난스러움
```
'장난', '유쾌', '재밌', '익살', '코믹', '농담'
```

### 신비로움
```
'신비', '미스터리', '알수없', '수수께끼', '비밀'
```

### 순수함
```
'순수', '천진', '순진', '어린아이', '맑은'
```

### 자신감
```
'자신감', '당당', '확신', '자신있', '떳떳', '자부심'
```

## 실전 시나리오

### 시나리오 1: 츤데레 로맨스
```
게임 설정: personality = "츤데레"

씬 1:
대사: "뭐야... 왜 따라오는 거야."
→ 감정 없음 → tsundere 기본 → thinking (무표정)

씬 2:
대사: "싫어! 가버려!"
→ "싫어" 감지 → anger (화남)

씬 3:
대사: "...미안해."
→ 감정 약함 → tsundere 기본 → thinking (무표정)

씬 4:
대사: "사실은... 고마워."
→ "고마워" 감지 → smile (미소)
```

### 시나리오 2: 활발한 학원물
```
게임 설정: personality = "활발하고 밝음"

씬 1:
대사: "안녕! 나는 미나야!"
→ 감정 없음 → cheerful 기본 → smile (미소)

씬 2:
대사: "하하하! 완전 재밌어!"
→ "하하하" 감지 → laugh (웃음)

씬 3:
대사: "좋아! 같이 가자!"
→ "좋아" 감지 → smile (미소)
```

### 시나리오 3: 신비로운 판타지
```
게임 설정: personality = "신비로운"

씬 1:
대사: "..."
→ 감정 없음 → mysterious 기본 → thinking (무표정)

씬 2:
대사: "놀랍군요."
→ "놀랍" 감지 → surprise (놀람)

씬 3:
대사: "흠..."
→ 감정 없음 → mysterious 기본 → thinking (무표정)
```

## 고급 기능

### 신뢰도 점수
```typescript
const result = analyzePersonalityWithConfidence("츤데레");
console.log(result);
// {
//   personality: 'tsundere',
//   confidence: 1.0,
//   scores: { tsundere: 1, cheerful: 0, ... }
// }
```

### 성격 표시 이름
```typescript
getPersonalityDisplayName('tsundere')
→ "츤데레"

getPersonalityDescription('tsundere')
→ "겉으로는 차갑지만 속으로는 다정한 성격"
```

## 파일 구조

```
src/
├── types/
│   └── character.ts                  # 성격 타입 정의
├── utils/
│   ├── personalityAnalyzer.ts       # AI 성격 분석
│   ├── emotionDetector.ts           # 감정 감지 (성격 지원)
│   └── characterAssets.ts           # 캐릭터 이미지
├── services/
│   ├── storyService.ts              # API (character_personality)
│   └── gameService.ts               # API (personality)
└── pages/GamePage/
    └── index.tsx                     # 성격 통합
```

## 테스트 방법

### 개발 서버
```bash
npm run dev
```

### 테스트 케이스

#### 1. 츤데레 캐릭터
```
1. 게임 생성 시 personality: "츤데레" 입력
2. 대사: "..." → thinking 표정 확인
3. 대사: "고마워" → smile 표정 확인
```

#### 2. 활발한 캐릭터
```
1. 게임 생성 시 personality: "활발함" 입력
2. 대사: "안녕!" → smile 표정 확인
3. 대사: "하하하" → laugh 표정 확인
```

#### 3. 수줍은 캐릭터
```
1. 게임 생성 시 personality: "수줍음" 입력
2. 대사: "음..." → embarrassed 표정 확인
3. 대사: "부끄러워" → blush 표정 확인
```

## 장점

### 1. 캐릭터 개성 강화
- 성격에 맞는 기본 표정
- 더욱 생동감 있는 캐릭터
- 몰입도 향상

### 2. 백엔드 부담 감소
- 모든 대사에 표정 지정 불필요
- AI가 자동으로 적절한 표정 결정
- 개발 시간 단축

### 3. 유연한 설정
- 게임 단위로 성격 지정 가능
- 대사 단위로 세밀한 제어 가능
- 표정 직접 지정도 가능

## 확장 가능성

### 1. 더 많은 성격 추가
```typescript
export type CharacterPersonality =
  | ... // 기존 11개
  | 'yandere'      // 얀데레
  | 'kuudere'      // 쿠데레
  | 'dandere';     // 단데레
```

### 2. 상황별 표정 변화
```typescript
// 관계도에 따른 표정 변화
getTsundereExpression(relationshipLevel, text)
// level 1: thinking (차가움)
// level 5: smile (조금 따뜻)
// level 10: blush (완전 데레)
```

### 3. 학습 기반 개선
```typescript
// 플레이어 피드백 학습
improvePersonalityDetection(feedback)
```

## 문제 해결

### Q: 성격이 제대로 감지되지 않아요
A:
- 더 구체적인 성격 키워드 사용 ("쿨함" → "차갑고 냉정한")
- 백엔드에서 직접 타입 지정 ("tsundere")

### Q: 기본 표정이 이상해요
A:
- `PERSONALITY_DEFAULT_EXPRESSIONS` 수정
- 또는 대사마다 `emotion` 직접 지정

### Q: 모든 캐릭터가 같은 표정이에요
A:
- 각 캐릭터마다 다른 `personality` 설정
- 또는 `character_personality` 필드로 개별 지정

## 버전 히스토리

### v1.2.0 (현재)
- ✨ AI 기반 성격별 기본 표정 시스템
- 🤖 11가지 성격 유형 지원
- 🎭 성격별 최적화된 기본 표정

### v1.1.0
- 🎚️ 캐릭터 크기 조절 기능

### v1.0.0
- 🎭 캐릭터 표정 시스템
- 🤖 자동 감정 감지

## 라이선스
MIT License
