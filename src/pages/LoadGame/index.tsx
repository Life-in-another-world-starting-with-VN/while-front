import React from 'react';
import LeftNavigation from '../../components/common/LeftNavigation';
import LoadGameContent from './components/LoadGameContent';
import { LoadGameContainer } from './styled';
import type { NavigationItem, PageType } from '../../types/navigation';

interface LoadGameProps {
  onNavigate?: (pageType: PageType) => void;
}

const LoadGame: React.FC<LoadGameProps> = ({ onNavigate }) => {
  const navigationItems: NavigationItem[] = [
    { label: '대사록', pageType: 'dialogue' },
    { label: '저장하기', pageType: 'saveGame' },
    { label: '불러오기', pageType: 'loadGame', isActive: true },
    { label: '환경설정', pageType: 'settings' },
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

  const handleSlotClick = (slotNumber: number) => {
    console.log(`Save slot ${slotNumber} clicked`);
  };

  return (
    <LoadGameContainer>
      <LeftNavigation
        navigationItems={navigationItems}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick}
      />
      <LoadGameContent onSlotClick={handleSlotClick} />
    </LoadGameContainer>
  );
};

export default LoadGame;