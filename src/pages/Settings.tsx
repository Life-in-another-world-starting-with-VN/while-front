import React from 'react';
import LeftNavigation from '../components/Settings/LeftNavigation';
import SettingsContent from '../components/Settings/SettingsContent';
import { SettingsContainer } from './Settings/styled';

const Settings: React.FC = () => {
  const navigationItems = [
    { label: '대사록' },
    { label: '저장하기' },
    { label: '불러오기' },
    { label: '환경설정', isActive: true },
    { label: '메인 메뉴' },
    { label: '조작방법' },
    { label: '종료하기' },
  ];

  const handleMenuClick = (index: number) => {
    console.log(`Menu ${index} clicked`);
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