import React from 'react';
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
import { PageContainer } from './styled';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <PageContainer>
      <Sidebar>
        <LogoBlock />
        <Link to="/game" style={{color: 'white', textDecorationLine: 'none', width: "100%"}}><MenuButton><Icon src={Play} /> 게임 시작</MenuButton></Link>
        <Link to="/loadgame" style={{color: 'white', textDecorationLine: 'none', width: "100%"}}><MenuButton><Icon src={Cell} /> 불러오기</MenuButton></Link>
        <Link to="/settings" style={{color: 'white', textDecorationLine: 'none', width: "100%"}}><MenuButton><Icon src={Option} /> 설정</MenuButton></Link>
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
