import type { Character, Scene, MenuItem } from '../../../types/game';

// 캐릭터 목 데이터
export const mockCharacters: Record<string, Character> = {
  unknown: {
    id: 'unknown',
    name: 'unknown',
    displayName: '???',
    color: '#fca1c7', // theme.colors.main
  },
  protagonist: {
    id: 'protagonist',
    name: 'protagonist',
    displayName: '주인공',
    color: '#ffffff',
  },
  friend: {
    id: 'friend',
    name: 'friend',
    displayName: '친구',
    color: '#fcbec2', // theme.colors.sub2
  },
};

// 씬 목 데이터
export const mockScenes: Record<string, Scene> = {
  intro: {
    id: 'intro',
    backgroundImage: undefined, // 검은 배경
    dialogues: [
      {
        id: 'intro_1',
        characterId: 'unknown',
        text: '게임이 시작되었습니다.',
      },
      {
        id: 'intro_2',
        characterId: 'unknown',
        text: '이곳은 어디일까요?',
      },
      {
        id: 'intro_3',
        characterId: 'protagonist',
        text: '...눈을 떴다.',
      },
    ],
    choices: [
      {
        id: 'choice_1',
        text: '주변을 둘러본다',
        nextSceneId: 'scene_1',
      },
      {
        id: 'choice_2',
        text: '일어서려고 시도한다',
        nextSceneId: 'scene_2',
      },
    ],
  },
  scene_1: {
    id: 'scene_1',
    dialogues: [
      {
        id: 'scene1_1',
        characterId: 'protagonist',
        text: '천천히 주변을 살펴보았다.',
      },
      {
        id: 'scene1_2',
        characterId: 'friend',
        text: '어? 깨어났구나!',
      },
      {
        id: 'scene1_3',
        characterId: 'protagonist',
        text: '너는...?',
      },
    ],
    nextSceneId: 'intro', // 루프 (실제로는 다른 씬으로)
  },
  scene_2: {
    id: 'scene_2',
    dialogues: [
      {
        id: 'scene2_1',
        characterId: 'protagonist',
        text: '몸을 일으키려 했지만...',
      },
      {
        id: 'scene2_2',
        characterId: 'protagonist',
        text: '아직 힘이 들어가지 않는다.',
      },
      {
        id: 'scene2_3',
        characterId: 'friend',
        text: '무리하지 마!',
      },
    ],
    nextSceneId: 'scene_1',
  },
};

// 메뉴 아이템 목 데이터
export const mockMenuItems: MenuItem[] = [
  { id: 'dialogueLog', label: '대사록' },
  { id: 'skip', label: '넘기기' },
  { id: 'auto', label: '자동진행' },
  { id: 'auto', label: '자동진행' }, // 중복 (디자인 요구사항)
  { id: 'quickAuto', label: 'Q.자동진행' },
  { id: 'quickLoad', label: 'Q.불러오기' },
  { id: 'settings', label: '설정' },
];

// 초기 게임 상태
export const mockInitialGameState = {
  currentSceneId: 'intro',
  currentDialogueIndex: 0,
  isAutoPlay: false,
  textSpeed: 5,
  autoPlaySpeed: 3000,
  history: [] as string[],
  flags: {},
};
