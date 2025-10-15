// 게임 데이터 타입 정의 (백엔드 연동용)

export interface Character {
  id: string;
  name: string;
  displayName: string;
  sprite?: string; // 캐릭터 이미지 URL
  color?: string; // 이름 표시 색상
}

export interface Dialogue {
  id: string;
  characterId: string;
  text: string;
  emotion?: 'normal' | 'happy' | 'sad' | 'angry' | 'surprised';
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  backgroundImage?: string;
  backgroundMusic?: string;
  dialogues: Dialogue[];
  choices?: Choice[];
  nextSceneId?: string; // 선택지가 없을 때 다음 씬
}

export interface GameState {
  currentSceneId: string;
  currentDialogueIndex: number;
  isAutoPlay: boolean;
  textSpeed: number; // 1-10
  autoPlaySpeed: number; // milliseconds
  history: string[]; // 대사 히스토리 (dialogueId 배열)
  flags: Record<string, boolean | number | string>; // 게임 진행 플래그
}

export interface SaveData {
  id: string;
  timestamp: number;
  sceneId: string;
  dialogueIndex: number;
  thumbnail?: string;
  previewText: string;
  gameState: GameState;
}

export type MenuAction =
  | 'dialogueLog'
  | 'skip'
  | 'auto'
  | 'quickAuto'
  | 'quickLoad'
  | 'settings';

export interface MenuItem {
  id: MenuAction;
  label: string;
}
