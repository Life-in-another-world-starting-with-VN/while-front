# While - 미연시 게임 UI 프로젝트

## 프로젝트 개요
미연시 게임의 설정 페이지와 게임 관리 UI를 개발하는 React + TypeScript 프로젝트입니다.

### ✨ 새로운 기능: 동적 캐릭터 표정 시스템
스토리 진행에 따라 캐릭터 표정이 자동으로 변경됩니다!
- 9가지 표정 지원 (화남, 웃음, 미소, 슬픔, 걱정, 당황, 부끄러움, 생각, 놀람)
- 텍스트 기반 자동 감정 감지
- 3명의 캐릭터 지원
- **캐릭터 크기 조절 기능** (50% ~ 150%)
- **AI 성격별 기본 표정** 🤖 (츤데레→무표정, 활발함→미소 등)
- **선택지 2-3개 제한** ✨ NEW! (깔끔한 UI/UX)
- 자세한 내용: [CHARACTER_EXPRESSION_SYSTEM.md](./CHARACTER_EXPRESSION_SYSTEM.md)
- 크기 조절 가이드: [CHARACTER_SIZE_FEATURE.md](./CHARACTER_SIZE_FEATURE.md)
- AI 성격 시스템: [AI_PERSONALITY_SYSTEM.md](./AI_PERSONALITY_SYSTEM.md)
- 선택지 제한 기능: [CHOICE_LIMIT_FEATURE.md](./CHOICE_LIMIT_FEATURE.md)

## 기술 스택
- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite 7.1.6
- **Styling**: Styled-components 6.1.19
- **State Management**: Zustand 5.0.8
- **Linting**: ESLint 9.35.0

## 프로젝트 구조
```
src/
├── assets/                    # 정적 리소스 (이미지, 아이콘 등)
├── components/               # 재사용 가능한 컴포넌트
│   ├── Settings/            # 설정 페이지 관련 컴포넌트
│   │   ├── LeftNavigation/  # 좌측 네비게이션 메뉴
│   │   ├── SettingGroup/    # 설정 그룹 컴포넌트
│   │   └── SettingsContent/ # 설정 콘텐츠 영역
│   └── common/              # 공통 컴포넌트
│       └── Slider/          # 슬라이더 컴포넌트
├── pages/                   # 페이지 컴포넌트
│   └── Settings/           # 설정 페이지
├── stores/                 # Zustand 상태 관리
├── styles/                 # 공통 스타일, 테마
│   ├── globalStyles.ts     # 글로벌 스타일
│   ├── theme.ts           # 테마 정의
│   └── index.ts           # 스타일 내보내기
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
├── App.tsx               # 메인 앱 컴포넌트
└── main.tsx              # 앱 진입점
```

## 개발 명령어
- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드 (TypeScript 컴파일 + Vite 빌드)
- `npm run lint` - ESLint 코드 검사
- `npm run preview` - 빌드된 앱 미리보기

## 코딩 컨벤션
1. **컴포넌트 명명**: PascalCase 사용 (예: `SettingsMenu`, `VolumeSlider`)
2. **파일 구조**: 컴포넌트별로 폴더 생성, index.tsx + styles.ts 분리
3. **상태 관리**: Zustand를 사용하여 전역 상태 관리
4. **스타일링**: styled-components 사용, 테마 시스템 활용
5. **타입 안전성**: 모든 props와 상태에 TypeScript 타입 정의

## 구현된 페이지
### 1. 설정 페이지 (Settings)
- **좌측 네비게이션**: 메뉴 항목들과 활성 상태 표시
- **화면 모드 설정**: 창 화면/전체 화면 옵션
- **넘기기 설정**: 읽지 않은 지문, 선택지 이후, 화면 전환 효과
- **오디오 설정**: 텍스트 속도, 자동 진행 시간, 배경음/효과음/음성 음량 슬라이더
- **하단 버튼**: 돌아가기, 모두 음소거

### 2. 불러오기 페이지 (LoadGame) - 구현 예정
- 저장된 게임 데이터 목록
- 각 세이브 파일의 미리보기와 정보
- 선택 및 불러오기 기능

## 피그마 디자인 구현 가이드
- **화면 크기**: 1920x1080 (데스크톱 기준)
- **반응형**: rem 단위 사용으로 다양한 화면 크기 대응
- **컴포넌트 기반**: 재사용 가능한 컴포넌트로 구성

## 주의사항
1. **반응형 디자인**: 다양한 화면 크기에 대응할 수 있도록 구현
2. **접근성**: 키보드 네비게이션, 스크린 리더 지원
3. **성능**: 불필요한 리렌더링 방지, React.memo 적절히 활용
4. **타입 안전성**: any 타입 사용 금지, 엄격한 타입 체크
5. **코드 품질**: ESLint 규칙 준수, 컴포넌트 분리 원칙

## 개발 시 체크리스트
- [ ] 새로운 컴포넌트 생성 시 types 정의
- [ ] styled-components로 스타일링
- [ ] Zustand store에 상태 관리 로직 추가
- [ ] ESLint 오류 없이 빌드 성공
- [ ] TypeScript 타입 체크 통과
- [ ] 피그마 디자인과 픽셀 퍼펙트 일치

## 참고사항
이 프로젝트는 피그마 MCP 연결을 통해 디자인을 실시간으로 참조하며 개발됩니다.