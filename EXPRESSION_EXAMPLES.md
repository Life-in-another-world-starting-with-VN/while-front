# 캐릭터 표정 시스템 사용 예제

## 자동 감정 감지 예제

시스템이 자동으로 감지하는 대화 예제들입니다.

### 😊 smile (미소)
```
"좋아, 같이 가자!"
"응, 괜찮아."
"고마워, 네 덕분이야."
"다행이네!"
```

### 😄 laugh (웃음)
```
"하하하! 정말 재밌어!"
"호호, 그럴 줄 알았어."
"완전 대박이야!"
"신난다! 최고야!"
```

### 🔥 anger (화남)
```
"화나! 왜 그런 거야?"
"짜증나서 못 참겠어!"
"정말 열받는다!"
"싫어! 절대 안 할 거야!"
```

### 😢 sad (슬픔)
```
"슬퍼... 눈물이 나."
"힘들어서 울 것 같아."
"외로워..."
"너무 괴로워."
```

### 😰 worry (걱정)
```
"걱정돼... 어떡하지?"
"불안해. 괜찮을까?"
"무서워... 떨려."
"조심해야 할 것 같아."
```

### 😳 embarrassed (당황)
```
"어? 당황스러운데..."
"어색하네..."
"난처한데... 어떡하지?"
"헷갈려..."
```

### 😊 blush (부끄러움)
```
"부끄러워... 얼굴이 빨개져."
"쑥스럽네..."
"민망해 죽겠어!"
"창피해..."
```

### 🤔 thinking (생각)
```
"음... 생각해보자."
"글쎄, 어떻게 해야 하지?"
"왜 그럴까?"
"고민되네..."
```

### 😲 surprise (놀람)
```
"와! 깜짝이야!"
"헉, 놀라워!"
"어머, 세상에!"
"정말? 믿을 수 없어!"
```

## 실제 스토리 시나리오 예제

### 시나리오 1: 로맨스 장면
```json
{
  "dialogues": [
    {
      "character_name": "여주인공",
      "text_template": "오늘 날씨 정말 좋다! 같이 산책할래?",
      "emotion": "smile"
    },
    {
      "character_name": "여주인공",
      "text_template": "하하하! 네가 그런 농담을 하다니 완전 웃겨!",
      "emotion": "laugh"
    },
    {
      "character_name": "여주인공",
      "text_template": "아... 부끄러워. 얼굴이 빨개지잖아...",
      "emotion": "blush"
    }
  ]
}
```

**결과**: smile → laugh → blush 순서로 표정 변화

### 시나리오 2: 긴장감 있는 장면
```json
{
  "dialogues": [
    {
      "character_name": "주인공",
      "text_template": "이상한 소리가 들려... 무서워.",
      "emotion": "worry"
    },
    {
      "character_name": "주인공",
      "text_template": "헉! 깜짝이야! 너였구나!",
      "emotion": "surprise"
    },
    {
      "character_name": "주인공",
      "text_template": "하... 다행이다. 안심했어.",
      "emotion": "smile"
    }
  ]
}
```

**결과**: worry → surprise → smile 순서로 표정 변화

### 시나리오 3: 갈등 장면
```json
{
  "dialogues": [
    {
      "character_name": "라이벌",
      "text_template": "왜 내 말을 안 듣는 거야? 화나!",
      "emotion": "anger"
    },
    {
      "character_name": "라이벌",
      "text_template": "어... 그게 아니라... 당황스러워.",
      "emotion": "embarrassed"
    },
    {
      "character_name": "라이벌",
      "text_template": "미안해... 내가 너무 심했어. 슬퍼.",
      "emotion": "sad"
    }
  ]
}
```

**결과**: anger → embarrassed → sad 순서로 표정 변화

## 백엔드 API 응답 예제

### 자동 감지 모드 (emotion 필드 없음)
```json
{
  "scene_id": "scene_001",
  "dialogues": [
    {
      "id": "dialogue_001",
      "text_template": "와! 정말 놀라워! 이럴 수가!",
      "character_name": "주인공"
    }
  ]
}
```
→ 시스템이 "놀"과 "놀라워"를 감지하여 자동으로 `surprise` 적용

### 수동 지정 모드 (emotion 필드 있음)
```json
{
  "scene_id": "scene_001",
  "dialogues": [
    {
      "id": "dialogue_001",
      "text_template": "좋아.",
      "character_name": "주인공",
      "emotion": "smile"
    }
  ]
}
```
→ API에서 지정한 `smile` 표정 직접 사용

### 혼합 모드
```json
{
  "scene_id": "scene_001",
  "dialogues": [
    {
      "id": "dialogue_001",
      "text_template": "좋아!",
      "character_name": "주인공",
      "emotion": "laugh"
    },
    {
      "id": "dialogue_002",
      "text_template": "하지만... 조금 걱정돼.",
      "character_name": "주인공"
    }
  ]
}
```
→ 첫 번째는 `laugh` 직접 지정, 두 번째는 "걱정"을 감지하여 자동으로 `worry` 적용

## 복합 감정 처리

한 대사에 여러 감정이 있을 경우, 가장 많이 매칭된 감정이 선택됩니다.

### 예제 1: 화남과 놀람
```
"깜짝이야! 왜 그래! 화나!"
```
→ "깜짝" (surprise), "화나" (anger) → anger 선택 (키워드 점수가 더 높음)

### 예제 2: 웃음과 미소
```
"하하하! 좋아 좋아!"
```
→ "하하하" (laugh), "좋아" (smile) → laugh 선택

### 예제 3: 감정이 없는 경우
```
"그래."
```
→ 감정 키워드 없음 → 기본값 `smile` 적용

## 테스트 케이스

### 단위 테스트 예제
```typescript
import { detectEmotion } from './utils/emotionDetector';

// Test 1: 명확한 감정
expect(detectEmotion("화가 나!")).toBe('anger');
expect(detectEmotion("하하하 재밌어!")).toBe('laugh');
expect(detectEmotion("슬퍼서 눈물이 나")).toBe('sad');

// Test 2: 복합 감정
expect(detectEmotion("웃기긴 한데 조금 화나")).toBe('anger');

// Test 3: 감정 없음
expect(detectEmotion("그래.")).toBe('smile');

// Test 4: 빈 문자열
expect(detectEmotion("")).toBe('smile');
```

### 통합 테스트 시나리오
```typescript
// 1. 게임 시작
// 2. 첫 대화: "안녕! 반가워!" → smile
// 3. 다음 대화: "하하하! 정말 신나!" → laugh
// 4. 다음 대화: "어? 당황스러운데..." → embarrassed
// 5. 표정 변화 확인: smile → laugh → embarrassed
```

## 디버깅 팁

### 감정 감지 확인
브라우저 콘솔에서 감정 감지를 테스트할 수 있습니다:

```javascript
import { detectEmotionWithConfidence } from './utils/emotionDetector';

const result = detectEmotionWithConfidence("와! 놀라워!");
console.log(result);
// {
//   emotion: 'surprise',
//   confidence: 1.0,
//   scores: { anger: 0, laugh: 0, smile: 0, sad: 0, worry: 0,
//             embarrassed: 0, blush: 0, thinking: 0, surprise: 2 }
// }
```

### 표정 변화 로그
CharacterSprite 컴포넌트에 로그 추가:

```typescript
useEffect(() => {
  console.log(`Expression changed: ${expression}`);
  const newImage = getCharacterImage(characterId, expression);
  console.log(`Image: ${newImage}`);
  // ...
}, [characterId, expression, currentImage]);
```

## 주의사항

### 1. 감정 키워드 우선순위
더 구체적인 감정 키워드가 우선합니다:
- "화나지만 웃어" → `anger` (더 강한 감정)
- "좋긴 한데 걱정돼" → `worry` (더 구체적)

### 2. 나레이션 처리
캐릭터 이름이 "나레이션"인 경우 캐릭터가 표시되지 않습니다:
```json
{
  "character_name": "나레이션",
  "text_template": "그날 밤, 달은 밝게 빛나고 있었다."
}
```

### 3. 빈 대사 처리
대사가 비어있거나 null인 경우 기본 표정(`smile`)이 적용됩니다.

## 성능 최적화 팁

### 1. 이미지 프리로드
```typescript
import { preloadCharacterImages } from './utils/characterAssets';

// App 시작 시
useEffect(() => {
  preloadCharacterImages()
    .then(() => console.log('모든 이미지 로드 완료'))
    .catch(err => console.error('이미지 로드 실패:', err));
}, []);
```

### 2. 메모이제이션
```typescript
const currentExpression = useMemo(() =>
  currentDialogue?.emotion || detectEmotion(currentDialogue?.text_template || ''),
  [currentDialogue]
);
```

### 3. 디바운싱
빠른 대화 전환 시 표정 변화 디바운싱:
```typescript
const [debouncedExpression, setDebouncedExpression] = useState(expression);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedExpression(expression);
  }, 100);
  return () => clearTimeout(timer);
}, [expression]);
```
