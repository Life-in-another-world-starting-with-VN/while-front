# 캐릭터 표정 시스템 (Character Expression System)

## 개요
스토리 진행에 따라 캐릭터의 표정이 자동으로 변경되는 동적 표정 시스템입니다.

## 주요 기능

### 1. 자동 감정 감지
- 대화 텍스트를 분석하여 자동으로 감정을 감지
- 9가지 표정 지원: 화남, 웃음, 미소, 슬픔, 걱정, 당황, 부끄러움, 생각, 놀람

### 2. 3명의 캐릭터 지원
- 각 캐릭터마다 모든 표정 이미지 보유
- 캐릭터 이름 기반으로 일관된 캐릭터 ID 할당

### 3. 부드러운 전환 효과
- 표정 변경 시 fade 효과 적용
- 자연스러운 캐릭터 애니메이션

### 4. 캐릭터 크기 조절
- 설정 페이지에서 캐릭터 크기 조절 가능
- 50% ~ 150% 범위로 자유롭게 조정
- 실시간 반영 및 부드러운 크기 전환 효과

### 5. AI 기반 성격별 기본 표정 ✨ NEW
- 캐릭터 성격을 AI가 자동 분석
- 11가지 성격 유형 지원 (츤데레, 활발함, 수줍음, 쿨함 등)
- 성격에 맞는 기본 표정 자동 설정
- 예: 츤데레 → 무표정(thinking), 활발함 → 미소(smile)

## 사용된 표정 및 키워드

### anger (화남) 🔥
키워드: 화, 짜증, 분노, 열받, 빡, 욕, 싫, 미워, 증오 등

### laugh (웃음) 😄
키워드: 하하, 호호, 히히, 크크, 웃, 재밌, 즐거, 신나 등

### smile (미소) 😊
키워드: 미소, 좋, 괜찮, 응, 네, 고마, 감사, 다행 등

### sad (슬픔) 😢
키워드: 슬, 눈물, 우, 울, 힘들, 외로, 쓸쓸 등

### worry (걱정) 😰
키워드: 걱정, 불안, 두렵, 무서, 겁, 염려, 근심 등

### embarrassed (당황) 😳
키워드: 당황, 어색, 곤란, 난처, 쩔쩔, 버벅 등

### blush (부끄러움) 😊
키워드: 부끄, 얼굴, 빨개, 쑥스, 민망, 창피 등

### thinking (생각) 🤔
키워드: 생각, 음, 글쎄, 어디, 무엇, 왜, 고민 등

### surprise (놀람) 😲
키워드: 놀, 깜짝, 어머, 헉, 와, 우와, 충격 등

## 기술 구현

### 파일 구조
```
src/
├── types/
│   └── character.ts              # 표정 타입 정의
│   └── index.ts                  # SettingsState (캐릭터 크기 포함)
├── utils/
│   ├── emotionDetector.ts        # 감정 감지 로직
│   ├── characterAssets.ts        # 캐릭터 이미지 관리
│   └── settingsStorage.ts        # 설정 저장/로드 유틸리티
├── services/
│   └── storyService.ts           # 스토리 API (표정 지원 추가)
├── pages/
│   ├── Settings/                 # 설정 페이지 (캐릭터 크기 슬라이더)
│   └── GamePage/
│       └── components/
│           └── CharacterSprite/
│               └── index.tsx     # 표정 & 크기 변경 컴포넌트
```

### 주요 함수

#### detectEmotion(text: string): CharacterExpression
대화 텍스트에서 감정을 자동 감지합니다.

```typescript
const emotion = detectEmotion("와! 정말 놀라워!");
// Returns: 'surprise'
```

#### getCharacterImage(characterId: CharacterId, expression: CharacterExpression): string
캐릭터 ID와 표정에 맞는 이미지 URL을 반환합니다.

```typescript
const imageUrl = getCharacterImage('1', 'smile');
```

#### getCharacterIdFromName(characterName: string): CharacterId
캐릭터 이름으로부터 일관된 ID를 생성합니다.

```typescript
const id = getCharacterIdFromName("주인공");
// Returns: '1', '2', or '3' (일관성 보장)
```

## 백엔드 연동 (옵션)

백엔드에서 표정 정보를 직접 제공하려면:

### API 응답 형식
```json
{
  "dialogues": [
    {
      "id": "dialogue_1",
      "text_template": "안녕! 오늘 날씨 정말 좋다!",
      "character_name": "주인공",
      "emotion": "smile"
    }
  ]
}
```

### 지원되는 emotion 값
- `"anger"` - 화남
- `"laugh"` - 웃음
- `"smile"` - 미소
- `"sad"` - 슬픔
- `"worry"` - 걱정
- `"embarrassed"` - 당황
- `"blush"` - 부끄러움
- `"thinking"` - 생각
- `"surprise"` - 놀람

### 우선순위
1. API에서 제공한 `emotion` 값 (있는 경우)
2. 텍스트 자동 분석 결과 (없는 경우)
3. 기본값 `"smile"` (분석 실패시)

## 확장 가능성

### 새로운 표정 추가
1. `src/assets/MainCharacter/` 에 이미지 추가
   - 형식: `{캐릭터번호}_{표정이름}.png`
   - 예: `1_happy.png`, `2_happy.png`, `3_happy.png`

2. `src/types/character.ts` 에 타입 추가
```typescript
export type CharacterExpression =
  | 'anger'
  | 'laugh'
  // ... 기존 표정들
  | 'happy';  // 새로운 표정
```

3. `src/types/character.ts` 의 `EMOTION_KEYWORDS` 에 키워드 추가
```typescript
export const EMOTION_KEYWORDS: Record<CharacterExpression, string[]> = {
  // ... 기존 키워드들
  happy: ['행복', '기쁨', '즐거움', '만족'],
};
```

4. `src/utils/characterAssets.ts` 에 이미지 import 추가
```typescript
import char1Happy from '../assets/MainCharacter/1_happy.png';
// ... 다른 캐릭터들도 추가
```

### 감정 감지 정확도 향상
`src/utils/emotionDetector.ts` 의 키워드 목록을 업데이트하여 감지 정확도를 높일 수 있습니다.

## 테스트 방법

### 로컬 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

### 표정 테스트
다양한 감정이 담긴 대화를 작성하여 표정이 올바르게 변경되는지 확인:

- "화가 나!" → anger
- "하하하 재밌어!" → laugh
- "좋아, 괜찮아" → smile
- "슬퍼서 눈물이 나" → sad
- "걱정돼" → worry
- "당황스러워" → embarrassed
- "부끄러워 얼굴이 빨개져" → blush
- "음... 생각해보자" → thinking
- "와! 깜짝이야!" → surprise

## 성능 최적화

### 이미지 프리로드
```typescript
import { preloadCharacterImages } from './utils/characterAssets';

// 앱 시작 시 모든 캐릭터 이미지 미리 로드
preloadCharacterImages().then(() => {
  console.log('모든 캐릭터 이미지 로드 완료');
});
```

### 표정 전환 부드럽게
`CharacterSprite` 컴포넌트에서 150ms fade 효과로 자연스러운 전환을 구현했습니다.

## 문제 해결

### Q: 표정이 변경되지 않아요
A:
1. 대화 텍스트에 감정 키워드가 포함되어 있는지 확인
2. 백엔드 API에서 올바른 `emotion` 값을 반환하는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### Q: 특정 캐릭터의 이미지가 안 나와요
A:
1. `src/assets/MainCharacter/` 폴더에 해당 이미지 파일이 있는지 확인
2. 파일 이름이 `{번호}_{표정}.png` 형식인지 확인
3. `src/utils/characterAssets.ts` 에 import가 올바른지 확인

### Q: 표정이 너무 빨리 변해요
A:
`src/pages/GamePage/components/CharacterSprite/index.tsx` 에서 `setTimeout` 값을 조정하여 전환 속도를 변경할 수 있습니다.

## 기여

새로운 표정이나 개선 사항이 있으면 PR을 제출해주세요!

## 라이선스
MIT License
