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
// import CharacterSprite from './components/CharacterSprite'; // Not used in current implementation
import DialogueLogModal from './components/DialogueLogModal';
import { mockMenuItems } from './data/mockGameData';
import type { MenuAction } from '../../types/game';

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
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

const ErrorMessage = styled.div`
  padding: 1rem;
  background: #fed7d7;
  color: #c53030;
  border-radius: 12px;
  margin-bottom: 1rem;
  text-align: center;
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
    playtime: 60,
  });

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
      const token = await getToken();
      const newGame = await createGame(gameForm, token);
      const gameDetail = await getGame(newGame.id, token);
      setCurrentGame(gameDetail);
      await loadGameState(newGame.id, token);
      setMode('playing');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게임 생성에 실패했습니다.');
    }
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
          characterName: '캐릭터', // Can be enhanced with character data
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
        </SetupCard>
      </GameSetupScreen>
    );
  }

  if (mode === 'create') {
    return (
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
            />
          </FormField>
          <FormField>
            <Label>예상 플레이 시간 (분)</Label>
            <Input
              type="number"
              min="10"
              max="300"
              value={gameForm.playtime}
              onChange={e => setGameForm({ ...gameForm, playtime: parseInt(e.target.value) })}
            />
          </FormField>
          <Button onClick={handleCreateGame}>게임 생성하기</Button>
          {availableGames.length > 0 && (
            <Button
              onClick={() => setMode('select')}
              style={{ marginTop: '1rem', background: '#718096' }}
            >
              기존 게임 선택
            </Button>
          )}
        </SetupCard>
      </GameSetupScreen>
    );
  }

  // Render gameplay
  if (!storyState || !currentGame) {
    return <LoadingScreen>게임을 시작하는 중...</LoadingScreen>;
  }

  const currentDialogue = storyState.dialogues[currentDialogueIndex];
  const showChoices =
    currentDialogueIndex === storyState.dialogues.length - 1 &&
    storyState.available_choices.length > 0;

  return (
    <Container backgroundImage={backgroundImage}>
      <PinkBlurOverlay />

      {!showChoices && <ClickableOverlay onClick={handleNextDialogue} />}

      {currentDialogue && (
        <DialogueBox
          characterName="캐릭터"
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
