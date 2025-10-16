import styled from 'styled-components';
import { theme } from '../../../../styles';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: auto;
`;

export const ModalContainer = styled.div`
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${theme.borderRadius.lg};
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(252, 161, 199, 0.3);
  overflow: hidden;

  ${theme.media.mobile} {
    width: 95%;
    max-height: 85vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.xxl};
  border-bottom: 1px solid rgba(252, 161, 199, 0.2);

  ${theme.media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
  }
`;

export const ModalTitle = styled.h2`
  color: ${theme.colors.main};
  font-size: ${theme.typography.sizes.option};
  font-weight: ${theme.typography.weights.regular};
  margin: 0;

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.subOption};
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.grayText};
  font-size: ${theme.typography.sizes.option};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  transition: color 0.2s ease;
  line-height: 1;

  &:hover {
    color: ${theme.colors.white};
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.subOption};
  }
`;

export const LogContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.xl} ${theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(252, 161, 199, 0.1);
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(252, 161, 199, 0.3);
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.main};
  }

  ${theme.media.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    gap: ${theme.spacing.lg};
  }
`;

export const LogItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CharacterName = styled.div<{ color?: string }>`
  color: ${props => props.color || theme.colors.main};
  font-size: ${theme.typography.sizes.subOption};
  font-weight: ${theme.typography.weights.medium};
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.button};
  }
`;

export const DialogueText = styled.div`
  color: ${theme.colors.white};
  font-size: ${theme.typography.sizes.subOption};
  line-height: 1.6;
  padding-left: ${theme.spacing.md};
  border-left: 2px solid rgba(252, 161, 199, 0.3);

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.button};
    padding-left: ${theme.spacing.sm};
  }
`;

export const EmptyMessage = styled.div`
  color: ${theme.colors.grayText};
  font-size: ${theme.typography.sizes.subOption};
  text-align: center;
  padding: ${theme.spacing.xxl};

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.button};
    padding: ${theme.spacing.xl};
  }
`;
