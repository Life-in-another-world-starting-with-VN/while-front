import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LogoBlock from './components/LogoBlock';
import MenuButton from './components/MenuButton';
import Icon from './components/Icon';
import { Content, BackgroundImage } from './components/CharacterDisplay';
import Play from '../../assets/MainBtnicon/play.svg';
import Cell from '../../assets/MainBtnicon/cell.svg';
import Option from '../../assets/MainBtnicon/option.svg';
import Exit from '../../assets/MainBtnicon/exit.svg';
import startBg from '../../assets/start-bg.png';
import { PageContainer } from './styled';
import ExitModal from './components/ExitModal';
import { useAuth } from '../../store/AuthContext';
import SurveyModal, { type SurveyFormValues } from './components/SurveyModal';
import { publishGameSurvey } from '../../api/gameSurvey';

function MainPage() {
  const navigate = useNavigate();
  const { logout, accessToken, refreshAccessToken } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false);
  const [surveySubmissionError, setSurveySubmissionError] = useState<string | null>(null);

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

  const handleStartGameClick = () => {
    setIsSurveyModalOpen(true);
  };

  const handleSurveyClose = () => {
    if (isSubmittingSurvey) return;

    setIsSurveyModalOpen(false);
    setSurveySubmissionError(null);
  };

  const handleSurveySubmit = async (values: SurveyFormValues) => {
    const playtime = Number(values.playTime);
    if (!Number.isFinite(playtime) || playtime <= 0) {
      setSurveySubmissionError('예상 플레이 타임을 다시 선택해주세요.');
      return;
    }

    setIsSubmittingSurvey(true);
    setSurveySubmissionError(null);

    try {
      let token = accessToken;

      if (!token) {
        const refreshed = await refreshAccessToken();
        token = refreshed.accessToken;
      }

      if (!token) {
        throw new Error('액세스 토큰을 가져오지 못했습니다. 다시 로그인해 주세요.');
      }

      const createdGame = await publishGameSurvey(
        {
          personality: values.personality,
          genre: values.genre,
          playtime,
        },
        { accessToken: token },
      );

      setIsSurveyModalOpen(false);
      navigate('/Game', { state: { survey: values, game: createdGame } });
    } catch (error) {
      console.error(error);
      setSurveySubmissionError(
        error instanceof Error
          ? error.message
          : '조사를 전송하지 못했습니다. 잠시 후 다시 시도해주세요.',
      );
    } finally {
      setIsSubmittingSurvey(false);
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <LogoBlock />
        <MenuButton onClick={handleStartGameClick}>
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
        <BackgroundImage src={startBg} alt="게임 시작 배경" />
      </Content>
      <ExitModal
        isOpen={isLogoutModalOpen}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={handleSurveyClose}
        onSubmit={handleSurveySubmit}
        isSubmitting={isSubmittingSurvey}
        submissionError={surveySubmissionError}
      />
    </PageContainer>
  );
}

export default MainPage;
