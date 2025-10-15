import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuAction, MenuItem } from '../../../../types/game';
import { MenuContainer, MenuItem as StyledMenuItem } from './styled';

interface GameMenuProps {
  menuItems: MenuItem[];
  onMenuClick?: (action: MenuAction) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ menuItems, onMenuClick }) => {
  const navigate = useNavigate();

  const handleMenuClick = (action: MenuAction) => {
    // 기본 동작
    switch (action) {
      case 'quickLoad':
        navigate('/LoadGame');
        break;
      case 'settings':
        navigate('/Settings');
        break;
      default:
        // 커스텀 핸들러가 있으면 실행
        onMenuClick?.(action);
        break;
    }
  };

  return (
    <MenuContainer>
      {menuItems.map((item, index) => (
        <StyledMenuItem
          key={`${item.id}-${index}`}
          onClick={() => handleMenuClick(item.id)}
        >
          {item.label}
        </StyledMenuItem>
      ))}
    </MenuContainer>
  );
};

export default GameMenu;
