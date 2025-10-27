# 캐릭터 크기 조절 기능

## 개요
플레이어가 설정 페이지에서 캐릭터의 크기를 자유롭게 조절할 수 있는 기능입니다.

## 주요 기능

### 1. 설정 페이지 슬라이더
- **위치**: 환경설정 → 좌측 슬라이더 컬럼 하단
- **범위**: 50% ~ 150%
- **기본값**: 100% (원본 크기)

### 2. 실시간 적용
- 설정 변경 시 게임 화면에 즉시 반영
- 부드러운 크기 전환 효과 (0.3초)

### 3. 설정 저장
- localStorage에 자동 저장
- 브라우저를 닫았다 열어도 설정 유지

## 사용 방법

### 플레이어 관점
1. 게임 중 메뉴 열기
2. "환경설정" 선택
3. "캐릭터 크기" 슬라이더 조절
4. 실시간으로 캐릭터 크기 변경 확인

### 크기 단계
```
50%  - 최소 크기 (화면의 절반)
75%  - 작게
100% - 기본 크기 (권장)
125% - 크게
150% - 최대 크기 (화면의 1.5배)
```

## 기술 구현

### 1. 타입 정의
```typescript
// src/types/index.ts
export interface SettingsState {
  // ... 기존 설정들
  characterSize: number; // 50~150 (percentage)
}
```

### 2. 설정 저장/로드
```typescript
// src/utils/settingsStorage.ts
export function getCharacterSize(): number {
  const settings = loadSettings();
  return settings?.characterSize ?? 100;
}

export function subscribeToSettings(
  callback: (settings: Partial<SettingsState>) => void
): () => void {
  // localStorage 변경 감지 및 콜백 실행
}
```

### 3. 설정 페이지
```typescript
// src/pages/Settings/index.tsx
const defaultSettings: SettingsState = {
  // ... 기존 설정들
  characterSize: 100, // 기본값
};

// 검증 로직
characterSize: clampNumber(raw.characterSize, 50, 150, defaultSettings.characterSize)
```

### 4. 캐릭터 스프라이트 적용
```typescript
// src/pages/GamePage/components/CharacterSprite/index.tsx
const [characterSize, setCharacterSize] = useState<number>(() => getCharacterSize());

// 설정 변경 구독
useEffect(() => {
  const unsubscribe = subscribeToSettings((settings) => {
    if (settings.characterSize !== undefined) {
      setCharacterSize(settings.characterSize);
    }
  });
  return unsubscribe;
}, []);

// CSS transform 적용
const scale = characterSize / 100;
style={{ transform: `scale(${scale})` }}
```

## 설정값 구조

### localStorage 저장 형식
```json
{
  "gameSettings": {
    "screenMode": "windowed",
    "skipUnreadText": false,
    "skipAfterChoice": false,
    "skipScreenTransition": false,
    "textSpeed": 5,
    "autoProgressTime": 5,
    "backgroundVolume": 70,
    "soundEffectVolume": 70,
    "voiceVolume": 70,
    "isMuted": false,
    "characterSize": 100
  }
}
```

## UI/UX 고려사항

### 1. 반응성
- 설정 변경 시 즉시 반영
- 부드러운 전환 애니메이션 (300ms)

### 2. 사용성
- 직관적인 슬라이더 UI
- 실시간 미리보기
- 설정 자동 저장

### 3. 접근성
- 키보드로 슬라이더 조작 가능
- 명확한 레이블 ("캐릭터 크기")
- 현재 값 시각적 표시

## 성능 최적화

### 1. CSS Transform 사용
```css
transform: scale(1.25);
transition: transform 0.3s ease-in-out;
```
- GPU 가속 활용
- 리플로우 없음
- 부드러운 애니메이션

### 2. 설정 변경 최소화
```typescript
useEffect(() => {
  const unsubscribe = subscribeToSettings((settings) => {
    if (settings.characterSize !== undefined) {
      setCharacterSize(settings.characterSize);
    }
  });
  return unsubscribe;
}, []); // 한 번만 구독
```

### 3. 메모이제이션
```typescript
const scale = useMemo(() => characterSize / 100, [characterSize]);
```

## 브라우저 호환성

### 지원 브라우저
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### CSS Transform 지원
- `transform: scale()` - 모든 모던 브라우저 지원
- `transition` - 부드러운 애니메이션

## 문제 해결

### Q: 설정이 저장되지 않아요
A:
1. 브라우저 localStorage가 활성화되어 있는지 확인
2. 시크릿/프라이빗 모드에서는 저장이 제한될 수 있음
3. 브라우저 콘솔에서 에러 메시지 확인

### Q: 크기 변경이 부드럽지 않아요
A:
1. 하드웨어 가속이 활성화되어 있는지 확인
2. GPU 리소스 부족 여부 확인
3. 다른 애니메이션과 충돌 여부 확인

### Q: 너무 크거나 작게 설정했어요
A:
1. 설정 페이지에서 슬라이더를 100%로 재조정
2. 또는 localStorage 초기화:
```javascript
localStorage.removeItem('gameSettings');
```

## 확장 가능성

### 1. 프리셋 추가
```typescript
const SIZE_PRESETS = {
  small: 75,
  medium: 100,
  large: 125,
  xlarge: 150,
};
```

### 2. 캐릭터별 개별 크기
```typescript
interface CharacterSettings {
  [characterId: string]: {
    size: number;
    expression: CharacterExpression;
  };
}
```

### 3. 위치 조정
```typescript
interface CharacterSettings {
  size: number;
  offsetX: number;
  offsetY: number;
}
```

## 테스트

### 단위 테스트
```typescript
describe('Character Size Settings', () => {
  test('default size is 100%', () => {
    expect(getCharacterSize()).toBe(100);
  });

  test('size is clamped to 50-150 range', () => {
    saveSettings({ ...defaultSettings, characterSize: 200 });
    expect(getCharacterSize()).toBeLessThanOrEqual(150);
  });
});
```

### E2E 테스트
```typescript
test('character size changes when slider is moved', async () => {
  // 1. 설정 페이지 열기
  // 2. 캐릭터 크기 슬라이더 조작
  // 3. 게임 화면으로 돌아가기
  // 4. 캐릭터 크기 변경 확인
});
```

## 관련 파일

### 핵심 파일
- `src/types/index.ts` - SettingsState 타입
- `src/utils/settingsStorage.ts` - 설정 유틸리티
- `src/pages/Settings/index.tsx` - 설정 페이지
- `src/pages/Settings/components/SettingsContent/index.tsx` - 슬라이더 UI
- `src/pages/GamePage/components/CharacterSprite/index.tsx` - 크기 적용

### 문서
- `CHARACTER_EXPRESSION_SYSTEM.md` - 표정 시스템
- `DOCKER_GUIDE.md` - 배포 가이드

## 버전 히스토리

### v1.1.0 (현재)
- ✨ 캐릭터 크기 조절 기능 추가
- 🎨 부드러운 크기 전환 애니메이션
- 💾 localStorage 자동 저장

### v1.0.0
- 🎭 캐릭터 표정 시스템
- 🤖 자동 감정 감지
- 🎨 부드러운 표정 전환

## 라이선스
MIT License
