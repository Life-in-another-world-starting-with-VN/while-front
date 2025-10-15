import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles';

interface GamePageProps {
  backgroundImage?: string;
}

const Container = styled.div<{ backgroundImage?: string }>`
  width: 100%;
  height: 100vh;
  background: ${props =>
    props.backgroundImage
      ? `url(${props.backgroundImage}) center/cover no-repeat`
      : '#000000'
  };
  position: relative;
  font-family: ${theme.typography.fontFamily};
  overflow: hidden;
`;

const CharacterName = styled.div`
  position: absolute;
  left: 452px;
  top: 793px;
  font-size: ${theme.typography.sizes.option};
  color: ${theme.colors.main};
  font-weight: ${theme.typography.weights.regular};
  line-height: normal;
  white-space: nowrap;
`;

const DialogueText = styled.div`
  position: absolute;
  left: 491px;
  top: 867px;
  font-size: ${theme.typography.sizes.option};
  color: ${theme.colors.white};
  font-weight: ${theme.typography.weights.regular};
  line-height: normal;
  white-space: nowrap;
`;

const MenuContainer = styled.div`
  position: absolute;
  left: 521px;
  top: 1037px;
  display: flex;
  gap: 50px;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: ${theme.typography.sizes.button};
  color: ${theme.colors.grayText};
  font-weight: ${theme.typography.weights.regular};
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.white};
    transition: color 0.2s ease;
  }
`;


const GamePage: React.FC<GamePageProps> = ({ backgroundImage }) => {
  // link로 변경 필요
  const handleMenuClick = (menuItem: string) => {
    console.log(`${menuItem} clicked`);
  };

  return (
    <Container backgroundImage={backgroundImage}>
      <CharacterName>???</CharacterName>
      <DialogueText>게임이 시작되었습니다.</DialogueText>
      <MenuContainer>
        <MenuItem onClick={() => handleMenuClick('대사록')}>대사록</MenuItem>
        <MenuItem onClick={() => handleMenuClick('넘기기')}>넘기기</MenuItem>
        <MenuItem onClick={() => handleMenuClick('자동진행1')}>자동진행</MenuItem>
        <MenuItem onClick={() => handleMenuClick('자동진행2')}>자동진행</MenuItem>
        <MenuItem onClick={() => handleMenuClick('Q.자동진행')}>Q.자동진행</MenuItem>
        <MenuItem onClick={() => handleMenuClick('Q.불러오기')}>Q.불러오기</MenuItem>
        <MenuItem onClick={() => handleMenuClick('설정')}>설정</MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default GamePage;