import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { theme } from '../../styles';
import { useAuth } from '../../store/AuthContext';
import {
  getGames,
  createGame,
  getGame,
  type GameResponse,
  type GameDetailResponse,
  type GameCreateRequest,
} from '../../services/gameService';
import {
  startGame,
  getStoryState,
  makeChoice,
  getProgress,
  type StoryState,
} from '../../services/storyService';
import DialogueBox from './components/DialogueBox';
import GameMenu from './components/GameMenu';
import ChoiceButtons from './components/ChoiceButtons';
import AutoPlayModal from './components/AutoPlayModal';
import CharacterSprite from './components/CharacterSprite';
import DialogueLogModal from './components/DialogueLogModal';
import { mockMenuItems } from './data/mockGameData';
import type { MenuAction } from '../../types/game';

// 캐릭터 이미지 import
import char1 from '../../assets/MainCharacter/char1.png';
import char2 from '../../assets/MainCharacter/char2.png';
import char3 from '../../assets/MainCharacter/char3.png';

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
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${theme.media.mobile} {
    min-height: 100vh;
    height: auto;
  }
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  color: #ffffff;
  font-size: 1.5rem;
`;

const GameSetupScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #B1DEF7 0%, #E4E8EB 100%);;
  padding: 2rem;
`;

const SetupCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const SetupTitle = styled.h1`
  margin: 0 0 2rem 0;
  font-size: 2rem;
  color: #1a202c;
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #4a5568;
`;

const InputHint = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #718096;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;



const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    background: #5a67d8;
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const GameSelectList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
`;

const GameItem = styled.div`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: #667eea;
    background: #f7fafc;
  }
`;

const GameItemTitle = styled.div`
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.25rem;
`;

const GameItemInfo = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #718096;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: #4a5568;
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: #fed7d7;
  color: #c53030;
  border-radius: 12px;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 1.5rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const LoadingSubtext = styled.div`
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ConfirmCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ConfirmTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #1a202c;
  text-align: center;
`;

const ConfirmMessage = styled.p`
  margin: 0 0 2rem 0;
  color: #4a5568;
  text-align: center;
  line-height: 1.6;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ConfirmButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props =>
    props.variant === 'primary'
      ? `
    background: #667eea;
    color: white;
    &:hover {
      background: #5a67d8;
    }
  `
      : `
    background: #e2e8f0;
    color: #4a5568;
    &:hover {
      background: #cbd5e0;
    }
  `}

  &:active {
    transform: translateY(2px);
  }
`;

const ClickableOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
`;

const PinkBlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(102, 102, 102, 0.04) 0%,
    rgba(252, 161, 199, 0.4) 100%
  );
  pointer-events: none;
  z-index: 0;
`;

interface DialogueLogItem {
  characterName: string;
  characterColor?: string;
  text: string;
}

type GameSetupMode = 'loading' | 'select' | 'create' | 'playing';

// 캐릭터 이미지 매핑 함수
const getCharacterImage = (characterName: string): string => {
  // 캐릭터 이름에 따라 다른 이미지 반환
  const nameHash = characterName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const images = [char1, char2, char3];
  return images[nameHash % images.length];
};

const GamePage: React.FC<GamePageProps> = ({ backgroundImage }) => {
  const { accessToken, refreshAccessToken } = useAuth();
  // const navigate = useNavigate(); // Not used in current implementation
  const [searchParams] = useSearchParams();
  const gameIdParam = searchParams.get('gameId');

  const [mode, setMode] = useState<GameSetupMode>('loading');
  const [error, setError] = useState<string | null>(null);

  // Game selection state
  const [availableGames, setAvailableGames] = useState<GameResponse[]>([]);

  // Game creation state
  const [gameForm, setGameForm] = useState<GameCreateRequest>({
    personality: '',
    genre: '',
    playtime: 30, // 기본값 30분
  });
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [createdGameId, setCreatedGameId] = useState<string | null>(null);

  // Current game state
  const [currentGame, setCurrentGame] = useState<GameDetailResponse | null>(null);
  const [storyState, setStoryState] = useState<StoryState | null>(null);
  // const [progress, setProgress] = useState<ProgressResponse | null>(null); // Not displayed in current implementation
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [dialogueLog, setDialogueLog] = useState<DialogueLogItem[]>([]);

  // Modal states
  const [isAutoPlayModalOpen, setIsAutoPlayModalOpen] = useState(false);
  const [isDialogueLogModalOpen, setIsDialogueLogModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(3000);

  // Get or refresh access token
  const getToken = useCallback(async (): Promise<string> => {
    if (accessToken) return accessToken;
    const refreshed = await refreshAccessToken();
    return refreshed.accessToken;
  }, [accessToken, refreshAccessToken]);

  // Load games on mount
  useEffect(() => {
    const loadGames = async () => {
      try {
        const token = await getToken();

        if (gameIdParam) {
          // If gameId in URL, try to load that game directly
          const gameDetail = await getGame(gameIdParam, token);
          setCurrentGame(gameDetail);
          await loadGameState(gameIdParam, token);
          setMode('playing');
        } else {
          // Otherwise show game selection
          const games = await getGames(token);
          setAvailableGames(games);
          setMode(games.length > 0 ? 'select' : 'create');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '게임 목록을 불러오는데 실패했습니다.');
        setMode('create');
      }
    };

    loadGames();
  }, [gameIdParam, getToken]);

  // Load game state
  const loadGameState = async (gameId: string, token: string) => {
    try {
      const state = await getStoryState(gameId, token);
      setStoryState(state);
      setCurrentDialogueIndex(0);

      await getProgress(gameId, token);
      // setProgress(prog); // Progress stored but not displayed yet
    } catch (err) {
      // If no state exists, start new game
      try {
        await startGame(gameId, token);
        // setProgress(prog); // Progress stored but not displayed yet
        const state = await getStoryState(gameId, token);
        setStoryState(state);
        setCurrentDialogueIndex(0);
      } catch (startErr) {
        throw startErr;
      }
    }
  };

  // Create new game
  const handleCreateGame = async () => {
    try {
      setError(null);

      // 유효성 검사
      if (!gameForm.personality.trim()) {
        setError('성격 유형을 입력해주세요.');
        return;
      }
      if (!gameForm.genre.trim()) {
        setError('장르를 입력해주세요.');
        return;
      }
      if (gameForm.playtime < 5 || gameForm.playtime > 100) {
        setError('플레이 시간은 5분에서 100분 사이로 설정해주세요.');
        return;
      }

      setIsCreatingGame(true);
      const token = await getToken();
      const newGame = await createGame(gameForm, token);
      setCreatedGameId(newGame.id);
      setIsCreatingGame(false);
      setShowStartConfirm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '게임 생성에 실패했습니다.');
      setIsCreatingGame(false);
    }
  };

  // Start created game
  const handleStartCreatedGame = async () => {
    if (!createdGameId) return;
    try {
      setShowStartConfirm(false);
      const token = await getToken();
      const gameDetail = await getGame(createdGameId, token);
      setCurrentGame(gameDetail);
      await loadGameState(createdGameId, token);
      setMode('playing');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게임을 시작하는데 실패했습니다.');
    }
  };

  // Cancel starting game
  const handleCancelStart = () => {
    setShowStartConfirm(false);
    setCreatedGameId(null);
    setMode('select');
  };

  // Select existing game
  const handleSelectGame = async (game: GameResponse) => {
    try {
      setError(null);
      const token = await getToken();
      const gameDetail = await getGame(game.id, token);
      setCurrentGame(gameDetail);
      await loadGameState(game.id, token);
      setMode('playing');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게임을 불러오는데 실패했습니다.');
    }
  };

  // Navigate to next dialogue
  const handleNextDialogue = async () => {
    if (!storyState || !currentGame) return;

    const currentDialogue = storyState.dialogues[currentDialogueIndex];

    if (currentDialogue) {
      setDialogueLog(prev => [
        ...prev,
        {
          characterName: currentDialogue.character_name || '캐릭터',
          text: currentDialogue.text_template,
        },
      ]);
    }

    if (currentDialogueIndex < storyState.dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    }
  };

  // Handle choice selection
  const handleChoiceSelect = async (choiceId: string) => {
    if (!currentGame || !storyState) return;

    try {
      const token = await getToken();
      const currentDialogue = storyState.dialogues[currentDialogueIndex];

      // 선택한 choice 찾기
      const selectedChoice = storyState.available_choices.find(c => c.id === choiceId);

      // next_scene_id가 null이면 게임 종료
      if (selectedChoice && !selectedChoice.next_scene_id) {
        alert('게임이 종료되었습니다! 🎉\n다시 플레이하시려면 새로고침 해주세요.');
        window.location.reload();
        return;
      }

      const newState = await makeChoice(currentGame.id, currentDialogue.id, choiceId, token);
      setStoryState(newState);
      setCurrentDialogueIndex(0);

      await getProgress(currentGame.id, token);
      // setProgress(prog); // Progress stored but not displayed yet
    } catch (err) {
      setError(err instanceof Error ? err.message : '선택 처리에 실패했습니다.');
    }
  };

  // Handle menu actions
  const handleMenuAction = (action: MenuAction) => {
    switch (action) {
      case 'dialogueLog':
        setIsDialogueLogModalOpen(true);
        break;
      case 'skip':
        handleNextDialogue();
        break;
      case 'auto':
        setIsAutoPlayModalOpen(true);
        break;
      case 'quickAuto':
        setIsAutoPlayModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlay && storyState && currentDialogueIndex < storyState.dialogues.length - 1) {
      const timer = setTimeout(() => {
        handleNextDialogue();
      }, autoPlaySpeed);

      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, currentDialogueIndex, autoPlaySpeed, storyState]);

  // Render game setup screens
  if (mode === 'loading') {
    return <LoadingScreen>게임을 불러오는 중...</LoadingScreen>;
  }

  if (mode === 'select') {
    return (
      <GameSetupScreen>
        <SetupCard>
          <SetupTitle>게임 선택</SetupTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <GameSelectList>
            {availableGames.map(game => (
              <GameItem key={game.id} onClick={() => handleSelectGame(game)}>
                <GameItemTitle>{game.title}</GameItemTitle>
                <GameItemInfo>
                  {game.genre} · {game.personality} · {game.playtime}분
                </GameItemInfo>
              </GameItem>
            ))}
          </GameSelectList>
          <Button onClick={() => setMode('create')}>새 게임 만들기</Button>
          <BackButton onClick={() => window.history.back()}>뒤로가기</BackButton>
        </SetupCard>
      </GameSetupScreen>
    );
  }

  if (mode === 'create') {
    return (
      <>
        <GameSetupScreen>
          <SetupCard>
            <SetupTitle>새 게임 만들기</SetupTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormField>
              <Label>성격 유형</Label>
              <Input
                type="text"
                placeholder="예: 순수, 츤데레, 활발함, 차가움 등"
                value={gameForm.personality}
                onChange={e => setGameForm({ ...gameForm, personality: e.target.value })}
                required
                disabled={isCreatingGame}
              />
            </FormField>
            <FormField>
              <Label>장르</Label>
              <Input
                type="text"
                placeholder="예: 로맨스, 판타지, 학원물, 현대물 등"
                value={gameForm.genre}
                onChange={e => setGameForm({ ...gameForm, genre: e.target.value })}
                required
                disabled={isCreatingGame}
              />
            </FormField>
            <FormField>
              <Label>예상 플레이 시간 (분)</Label>
              <Input
                type="number"
                min="5"
                max="100"
                value={gameForm.playtime}
                onChange={e => setGameForm({ ...gameForm, playtime: parseInt(e.target.value) || 5 })}
                disabled={isCreatingGame}
              />
              <InputHint>최소 5분 ~ 최대 100분 (권장: 30~60분)</InputHint>
            </FormField>
            <Button onClick={handleCreateGame} disabled={isCreatingGame}>
              {isCreatingGame ? '생성 중...' : '게임 생성하기'}
            </Button>
            {availableGames.length > 0 && (
              <Button
                onClick={() => setMode('select')}
                style={{ marginTop: '1rem', background: '#718096' }}
                disabled={isCreatingGame}
              >
                기존 게임 선택
              </Button>
            )}
            <BackButton onClick={() => window.history.back()} disabled={isCreatingGame}>
              뒤로가기
            </BackButton>
          </SetupCard>
        </GameSetupScreen>

        {/* 로딩 오버레이 */}
        {isCreatingGame && (
          <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>AI가 게임을 생성하고 있습니다...</LoadingText>
            <LoadingSubtext>
              {gameForm.playtime}분 분량의 스토리를 작성 중입니다. 잠시만 기다려주세요.
            </LoadingSubtext>
          </LoadingOverlay>
        )}

        {/* 시작 확인 모달 */}
        {showStartConfirm && (
          <ConfirmModal>
            <ConfirmCard>
              <ConfirmTitle>🎉 게임 생성 완료!</ConfirmTitle>
              <ConfirmMessage>
                게임이 성공적으로 생성되었습니다.
                <br />
                바로 시작하시겠습니까?
              </ConfirmMessage>
              <ConfirmButtons>
                <ConfirmButton variant="secondary" onClick={handleCancelStart}>
                  나중에
                </ConfirmButton>
                <ConfirmButton variant="primary" onClick={handleStartCreatedGame}>
                  시작하기
                </ConfirmButton>
              </ConfirmButtons>
            </ConfirmCard>
          </ConfirmModal>
        )}
      </>
    );
  }

  // Render gameplay
  if (!storyState || !currentGame) {
    return <LoadingScreen>게임을 시작하는 중...</LoadingScreen>;
  }

  // Check if game has no dialogues
  if (storyState.dialogues.length === 0) {
    return (
      <LoadingScreen>
        <div>스토리 데이터가 없습니다.</div>
        <div style={{ fontSize: '1rem', marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
          게임이 아직 생성 중이거나 데이터가 준비되지 않았습니다.
        </div>
        <ErrorMessage style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
          새로고침
        </ErrorMessage>
      </LoadingScreen>
    );
  }

  const currentDialogue = storyState.dialogues[currentDialogueIndex];
  const showChoices =
    currentDialogueIndex === storyState.dialogues.length - 1 &&
    storyState.available_choices.length > 0;

  return (
    <Container backgroundImage={storyState.background_url || backgroundImage}>
      <PinkBlurOverlay />

      {!showChoices && <ClickableOverlay onClick={handleNextDialogue} />}

      {/* 캐릭터 스프라이트 표시 (나레이션일 때는 숨김) */}
      {currentDialogue && currentDialogue.character_name && currentDialogue.character_name !== "나레이션" && (
        <CharacterSprite
          sprite={getCharacterImage(currentDialogue.character_name)}
          characterName={currentDialogue.character_name}
        />
      )}

      {currentDialogue && (
        <DialogueBox
          characterName={currentDialogue.character_name || "캐릭터"}
          text={currentDialogue.text_template}
          onClick={handleNextDialogue}
        />
      )}

      {showChoices && (
        <ChoiceButtons
          choices={storyState.available_choices.map(choice => ({
            id: choice.id,
            text: choice.text,
            nextSceneId: choice.next_scene_id || '',
          }))}
          onChoiceSelect={handleChoiceSelect}
        />
      )}

      <GameMenu menuItems={mockMenuItems} onMenuClick={handleMenuAction} />

      <AutoPlayModal
        isOpen={isAutoPlayModalOpen}
        isAutoPlaying={isAutoPlay}
        onClose={() => setIsAutoPlayModalOpen(false)}
        onSelectSpeed={speed => {
          setAutoPlaySpeed(speed);
          setIsAutoPlay(true);
        }}
        onStop={() => setIsAutoPlay(false)}
      />

      <DialogueLogModal
        isOpen={isDialogueLogModalOpen}
        onClose={() => setIsDialogueLogModalOpen(false)}
        dialogueLog={dialogueLog}
      />

      {error && (
        <ErrorMessage style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          {error}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default GamePage;
