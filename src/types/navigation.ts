export type PageType = 'settings' | 'loadGame' | 'saveGame' | 'dialogue' | 'mainMenu' | 'controls' | 'exit';

export interface NavigationItem {
  label: string;
  isActive?: boolean;
  pageType: PageType;
}