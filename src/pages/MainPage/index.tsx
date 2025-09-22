import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import LogoBlock from './components/LogoBlock';
import MenuButton from './components/MenuButton';
import Icon from './components/Icon';
import { Content, Character } from './components/CharacterDisplay';
import Play from '../../assets/MainBtnicon/play.svg';
import Cell from '../../assets/MainBtnicon/cell.svg';
import Option from '../../assets/MainBtnicon/option.svg';
import Exit from '../../assets/MainBtnicon/exit.svg';
import char1 from '../../assets/MainCharacter/char1.png';
import char2 from '../../assets/MainCharacter/char2.png';
import char3 from '../../assets/MainCharacter/char3.png';
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: #e8f4ff;
`;

function MainPage() {
  return (
    <PageContainer>
      <Sidebar>
        <LogoBlock />
        <MenuButton><Icon src={Play} /> 게임 시작</MenuButton>
        <MenuButton><Icon src={Cell} /> 불러오기</MenuButton>
        <MenuButton><Icon src={Option} /> 설정</MenuButton>
        <MenuButton><Icon src={Exit} /> 종료</MenuButton>
      </Sidebar>
      <Content>
        <Character src={char1} alt="character1" />
        <Character src={char2} alt="character2" />
        <Character src={char3} alt="character3" />
      </Content>
    </PageContainer>
  );
}

export default MainPage;
