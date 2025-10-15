import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  SpeedOption,
  CloseButton,
  StopButton,
} from './styled';

interface AutoPlayModalProps {
  isOpen: boolean;
  isAutoPlaying: boolean;
  onClose: () => void;
  onSelectSpeed: (speed: number) => void;
  onStop: () => void;
}

const speedOptions = [
  { label: '1초', value: 1000 },
  { label: '2초', value: 2000 },
  { label: '3초', value: 3000 },
  { label: '4초', value: 4000 },
  { label: '5초', value: 5000 },
];

const AutoPlayModal: React.FC<AutoPlayModalProps> = ({
  isOpen,
  isAutoPlaying,
  onClose,
  onSelectSpeed,
  onStop,
}) => {
  if (!isOpen) return null;

  const handleSpeedSelect = (speed: number) => {
    onSelectSpeed(speed);
    onClose();
  };

  const handleStop = () => {
    onStop();
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalTitle>자동 진행 {isAutoPlaying ? '중' : '설정'}</ModalTitle>
        {speedOptions.map(option => (
          <SpeedOption
            key={option.value}
            onClick={() => handleSpeedSelect(option.value)}
          >
            {option.label}
          </SpeedOption>
        ))}
        {isAutoPlaying && (
          <StopButton onClick={handleStop}>자동 진행 끄기</StopButton>
        )}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AutoPlayModal;
