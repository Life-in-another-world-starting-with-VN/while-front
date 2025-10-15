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
        setGameState(prev => ({ ...prev, isAutoPlay: !prev.isAutoPlay }));
        console.log('자동 진행:', !gameState.isAutoPlay);
        break;
      case 'quickAuto':
        console.log('빠른 자동 진행');
        // TODO: 빠른 자동 진행 구현
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
    </Container>
  );
};

export default GamePage;