import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import ExitModal from './components/ExitModal';
import { useAuth } from '../../store/AuthContext';

function MainPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <PageContainer>
      <Sidebar>
        <LogoBlock />
        <MenuButton onClick={() => handleNavigate('/Game')}>
          <Icon src={Play} /> 게임 시작
        </MenuButton>
        <MenuButton onClick={() => handleNavigate('/LoadGame')}>
          <Icon src={Cell} /> 불러오기
        </MenuButton>
        <MenuButton onClick={() => handleNavigate('/Settings')}>
          <Icon src={Option} /> 설정
        </MenuButton>
        <MenuButton onClick={handleLogoutClick}>
          <Icon src={Exit} /> 로그아웃
        </MenuButton>
      </Sidebar>
      <Content>
        
      </Content>
      <ExitModal
        isOpen={isLogoutModalOpen}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </PageContainer>
  );
}

export default MainPage;
