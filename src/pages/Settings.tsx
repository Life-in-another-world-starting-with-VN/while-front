import React from 'react';
import LeftNavigation from '../components/Settings/LeftNavigation';
import SettingsContent from '../components/Settings/SettingsContent';
import { SettingsContainer } from './Settings/styled';
import type { NavigationItem, PageType } from '../types/navigation';

interface SettingsProps {
  onNavigate?: (pageType: PageType) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const navigationItems: NavigationItem[] = [
    { label: '대사록', pageType: 'dialogue' },
    { label: '저장하기', pageType: 'saveGame' },
    { label: '불러오기', pageType: 'loadGame' },
    { label: '환경설정', pageType: 'settings', isActive: true },
    { label: '메인 메뉴', pageType: 'mainMenu' },
    { label: '조작방법', pageType: 'controls' },
    { label: '종료하기', pageType: 'exit' },
  ];

  const handleMenuClick = (pageType: PageType) => {
    onNavigate?.(pageType);
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  const handleMuteClick = () => {
    console.log('Mute button clicked');
  };

  return (
    <SettingsContainer>
      <LeftNavigation
        navigationItems={navigationItems}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick}
      />
      <SettingsContent onMuteClick={handleMuteClick} />
    </SettingsContainer>
  );
};

export default Settings;