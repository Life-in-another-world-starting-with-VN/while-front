# While - 미연시 게임 UI 프로젝트

## 프로젝트 개요
미연시 게임의 설정 페이지와 게임 관리 UI를 개발하는 React + TypeScript 프로젝트입니다.

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

## 피그마 디자인 구현 가이드
현재 선택된 "환경설정" 프레임 기준:
- **화면 크기**: 1920x1080 (데스크톱 기준)
- **주요 컴포넌트**:
  - 좌측 메뉴 네비게이션
  - 화면 모드 설정 (창 화면/전체 화면)
  - 넘기기 설정 (체크박스 형태)
  - 오디오 설정 (슬라이더 컴포넌트)
  - 하단 버튼들 (돌아가기, 모두 음소거)

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