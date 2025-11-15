# 선택지 제한 기능 (Choice Limit Feature)

## 개요
플레이어에게 표시되는 선택지를 2~3개로 제한하는 기능입니다.

## 주요 기능

### 1. 선택지 개수 제한
- 백엔드에서 여러 개의 선택지가 전달되더라도 최대 3개까지만 표시
- 안정적인 UI/UX 제공
- 플레이어의 선택 부담 감소

### 2. 구현 방식
- 프론트엔드에서 선택지 배열을 슬라이스하여 제한
- 첫 번째부터 순서대로 최대 3개 표시
- 설정 가능한 상수를 통한 유연한 조정

## 기술 구현

### 파일 구조
```
src/
└── pages/GamePage/
    └── components/
        └── ChoiceButtons/
            └── index.tsx    # 선택지 제한 로직
```

### 주요 코드

#### ChoiceButtons 컴포넌트
```typescript
// 최대 선택지 개수 설정 (2-3개)
const MAX_CHOICES = 3;

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoiceSelect }) => {
  // 선택지를 MAX_CHOICES 개수로 제한
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
```

## 사용 예시

### 백엔드에서 5개의 선택지 전달
```json
{
  "available_choices": [
    { "id": "1", "text": "선택지 1" },
    { "id": "2", "text": "선택지 2" },
    { "id": "3", "text": "선택지 3" },
    { "id": "4", "text": "선택지 4" },
    { "id": "5", "text": "선택지 5" }
  ]
}
```

### 프론트엔드에서 3개만 표시
```
[화면에 표시됨]
- 선택지 1
- 선택지 2
- 선택지 3

[표시되지 않음]
- 선택지 4
- 선택지 5
```

## 설정 조정

### 최대 선택지 개수 변경
`src/pages/GamePage/components/ChoiceButtons/index.tsx` 파일의 `MAX_CHOICES` 상수를 수정:

```typescript
// 2개로 제한하고 싶은 경우
const MAX_CHOICES = 2;

// 3개로 제한하고 싶은 경우 (기본값)
const MAX_CHOICES = 3;
```

## 장점

### 1. 사용자 경험 개선
- 너무 많은 선택지로 인한 혼란 방지
- 빠른 의사결정 가능
- 깔끔한 UI

### 2. 개발 유연성
- 백엔드는 제한 없이 선택지 생성 가능
- 프론트엔드에서 표시 개수 제어
- 필요시 쉽게 조정 가능

### 3. 성능 최적화
- 렌더링할 컴포넌트 개수 감소
- 클릭 이벤트 핸들러 최소화

## 백엔드 연동

### API 응답 구조 (변경 없음)
```typescript
interface StoryState {
  // ... 기타 필드
  available_choices: Array<{
    id: string;
    text: string;
    dialogue_id: string;
    next_scene_id: string | null;
  }>;
}
```

### 권장 사항
백엔드에서도 선택지를 2~3개로 생성하는 것을 권장하지만, 필수는 아닙니다.
프론트엔드에서 자동으로 제한되므로 안전합니다.

## 테스트 방법

### 로컬 개발 서버 실행
```bash
npm run dev
```

### 테스트 시나리오

#### 1. 정상 케이스 (2-3개 선택지)
```
백엔드 응답: 2개 선택지
→ 2개 모두 표시됨 ✅

백엔드 응답: 3개 선택지
→ 3개 모두 표시됨 ✅
```

#### 2. 제한 케이스 (4개 이상)
```
백엔드 응답: 4개 선택지
→ 처음 3개만 표시됨 ✅

백엔드 응답: 10개 선택지
→ 처음 3개만 표시됨 ✅
```

#### 3. 예외 케이스
```
백엔드 응답: 1개 선택지
→ 1개만 표시됨 ✅

백엔드 응답: 0개 선택지
→ 아무것도 표시 안됨 (정상) ✅
```

## 확장 가능성

### 1. 동적 제한 설정
```typescript
// 설정 페이지에서 최대 선택지 개수 조정 가능하도록 확장
interface SettingsState {
  // ... 기존 설정
  maxChoices: number; // 2 ~ 5
}
```

### 2. 페이지네이션
```typescript
// 많은 선택지를 여러 페이지로 나눠서 표시
const [currentPage, setCurrentPage] = useState(0);
const displayedChoices = choices.slice(
  currentPage * MAX_CHOICES,
  (currentPage + 1) * MAX_CHOICES
);
```

### 3. 우선순위 기반 선택
```typescript
// 백엔드에서 priority 필드를 제공하면 중요한 선택지 우선 표시
const sortedChoices = [...choices]
  .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  .slice(0, MAX_CHOICES);
```

## 문제 해결

### Q: 선택지가 1개만 표시돼요
A: 백엔드가 1개의 선택지만 반환하고 있습니다. 백엔드 API 응답을 확인하세요.

### Q: 선택지 개수를 2개로 줄이고 싶어요
A: `MAX_CHOICES` 상수를 2로 변경하세요.

### Q: 모든 선택지를 보고 싶어요
A: `MAX_CHOICES` 상수를 큰 숫자(예: 10)로 설정하거나, `.slice(0, MAX_CHOICES)` 로직을 제거하세요.

### Q: 특정 씬에서만 선택지 개수를 다르게 하고 싶어요
A: Props로 `maxChoices` 를 받도록 컴포넌트를 수정하고, 부모에서 동적으로 전달하세요.

## 버전 히스토리

### v1.3.0 (현재)
- ✨ 선택지 2-3개 제한 기능 추가
- 📱 안정적인 UI/UX 제공
- ⚡ 성능 최적화

### v1.2.0
- 🤖 AI 기반 성격별 기본 표정 시스템
- 🎭 11가지 성격 유형 지원

### v1.1.0
- 🎚️ 캐릭터 크기 조절 기능

### v1.0.0
- 🎭 캐릭터 표정 시스템
- 🤖 자동 감정 감지

## 관련 문서
- [CHARACTER_EXPRESSION_SYSTEM.md](./CHARACTER_EXPRESSION_SYSTEM.md) - 표정 시스템
- [AI_PERSONALITY_SYSTEM.md](./AI_PERSONALITY_SYSTEM.md) - AI 성격 시스템
- [CHARACTER_SIZE_FEATURE.md](./CHARACTER_SIZE_FEATURE.md) - 크기 조절 기능

## 라이선스
MIT License
