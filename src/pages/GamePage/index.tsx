import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles';
import type { GameState, MenuAction } from '../../types/game';
import {
  mockCharacters,
  mockScenes,
  mockMenuItems,
  mockInitialGameState,
} from './data/mockGameData';
import DialogueBox from './components/DialogueBox';
import GameMenu from './components/GameMenu';
import ChoiceButtons from './components/ChoiceButtons';
import AutoPlayModal from './components/AutoPlayModal';
import CharacterSprite from './components/CharacterSprite';

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

const GamePage: React.FC<GamePageProps> = ({ backgroundImage }) => {
  const [gameState, setGameState] = useState<GameState>(mockInitialGameState);
  const [isAutoPlayModalOpen, setIsAutoPlayModalOpen] = useState(false);

  // 현재 씬과 대사 가져오기
  const currentScene = mockScenes[gameState.currentSceneId];
  const currentDialogue = currentScene?.dialogues[gameState.currentDialogueIndex];
  const currentCharacter = currentDialogue
    ? mockCharacters[currentDialogue.characterId]
    : null;

  // 선택지 표시 여부 (마지막 대사에 도달하고 선택지가 있을 때)
  const showChoices =
    gameState.currentDialogueIndex === currentScene?.dialogues.length - 1 &&
    currentScene?.choices &&
    currentScene.choices.length > 0;

  // 다음 대사로 진행
  const handleNextDialogue = () => {
    if (!currentScene) return;

    if (gameState.currentDialogueIndex < currentScene.dialogues.length - 1) {
      // 다음 대사로
      setGameState(prev => ({
        ...prev,
        currentDialogueIndex: prev.currentDialogueIndex + 1,
        history: [...prev.history, currentDialogue?.id || ''],
      }));
    } else if (currentScene.nextSceneId && !showChoices) {
      // 다음 씬으로 (선택지가 없을 때)
      setGameState(prev => ({
        ...prev,
        currentSceneId: currentScene.nextSceneId!,
        currentDialogueIndex: 0,
        history: [...prev.history, currentDialogue?.id || ''],
      }));
    }
  };

  // 선택지 선택
  const handleChoiceSelect = (choiceId: string) => {
    const choice = currentScene?.choices?.find(c => c.id === choiceId);
    if (choice) {
      setGameState(prev => ({
        ...prev,
        currentSceneId: choice.nextSceneId,
        currentDialogueIndex: 0,
        history: [...prev.history, currentDialogue?.id || '', choiceId],
      }));
    }
  };

  // 자동 진행 속도 선택
  const handleAutoPlaySpeedSelect = (speed: number) => {
    setGameState(prev => ({
      ...prev,
      isAutoPlay: true,
      autoPlaySpeed: speed,
    }));
  };

  // 자동 진행 끄기
  const handleAutoPlayStop = () => {
    setGameState(prev => ({
      ...prev,
      isAutoPlay: false,
    }));
  };

  // 메뉴 액션 처리
  const handleMenuAction = (action: MenuAction) => {
    switch (action) {
      case 'dialogueLog':
        console.log('대사록:', gameState.history);
        // TODO: 대사록 모달 열기
        break;
      case 'skip':
        handleNextDialogue();
        break;
      case 'auto':
        // 자동 진행 모달 열기
        setIsAutoPlayModalOpen(true);
        break;
      case 'quickAuto':
        // 빠른 자동 진행도 모달로 통합
        setIsAutoPlayModalOpen(true);
        break;
      default:
        break;
    }
  };

  // 자동 진행 모드
  useEffect(() => {
    if (gameState.isAutoPlay && !showChoices) {
      const timer = setTimeout(() => {
        handleNextDialogue();
      }, gameState.autoPlaySpeed);

      return () => clearTimeout(timer);
    }
  }, [gameState.isAutoPlay, gameState.currentDialogueIndex, showChoices]);

  return (
    <Container backgroundImage={backgroundImage || currentScene?.backgroundImage}>
      {/* 핑크 블러 오버레이 */}
      <PinkBlurOverlay />

      {/* 아무 곳이나 클릭 가능한 오버레이 */}
      {!showChoices && (
        <ClickableOverlay onClick={handleNextDialogue} />
      )}

      {/* 캐릭터 스프라이트 */}
      {currentCharacter && currentCharacter.sprite && (
        <CharacterSprite
          sprite={currentCharacter.sprite}
          characterName={currentCharacter.displayName}
        />
      )}

      {currentCharacter && currentDialogue && (
        <DialogueBox
          characterName={currentCharacter.displayName}
          characterColor={currentCharacter.color}
          text={currentDialogue.text}
          onClick={handleNextDialogue}
        />
      )}

      {showChoices && currentScene.choices && (
        <ChoiceButtons
          choices={currentScene.choices}
          onChoiceSelect={handleChoiceSelect}
        />
      )}

      <GameMenu menuItems={mockMenuItems} onMenuClick={handleMenuAction} />

      <AutoPlayModal
        isOpen={isAutoPlayModalOpen}
        isAutoPlaying={gameState.isAutoPlay}
        onClose={() => setIsAutoPlayModalOpen(false)}
        onSelectSpeed={handleAutoPlaySpeedSelect}
        onStop={handleAutoPlayStop}
      />
    </Container>
  );
};

export default GamePage;