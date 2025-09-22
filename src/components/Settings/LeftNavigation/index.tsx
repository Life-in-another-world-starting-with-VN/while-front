import React from 'react';
import {
  LeftSection,
  Title,
  MenuList,
  MenuItem,
  Divider,
  BackButton,
} from './styled';

interface NavigationItem {
  label: string;
  isActive?: boolean;
}

interface LeftNavigationProps {
  navigationItems: NavigationItem[];
  onMenuClick?: (index: number) => void;
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
            onClick={() => onMenuClick?.(index)}
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