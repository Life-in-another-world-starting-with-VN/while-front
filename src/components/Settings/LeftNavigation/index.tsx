import React from 'react';
import {
  LeftSection,
  Title,
  MenuList,
  MenuItem,
  Divider,
  BackButton,
} from './styled';
import type { NavigationItem, PageType } from '../../../types/navigation';

interface LeftNavigationProps {
  navigationItems: NavigationItem[];
  onMenuClick?: (pageType: PageType) => void;
  onBackClick?: () => void;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  navigationItems,
  onMenuClick,
  onBackClick,
}) => {
  return (
    <LeftSection>
      <Title>환경설정</Title>
      <MenuList>
        {navigationItems.map((item, index) => (
          <MenuItem
            key={index}
            isActive={item.isActive}
            onClick={() => onMenuClick?.(item.pageType)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <BackButton onClick={onBackClick}>돌아가기</BackButton>
    </LeftSection>
  );
};

export default LeftNavigation;