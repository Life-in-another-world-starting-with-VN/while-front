import styled from 'styled-components';
import { theme } from '../../../../styles';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
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
  padding: ${theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  min-width: 300px;
  border: 1px solid rgba(252, 161, 199, 0.3);

  ${theme.media.mobile} {
    padding: ${theme.spacing.xl};
    min-width: 250px;
    gap: ${theme.spacing.md};
  }
`;

export const ModalTitle = styled.h2`
  color: ${theme.colors.main};
  font-size: ${theme.typography.sizes.option};
  font-weight: ${theme.typography.weights.regular};
  text-align: center;
  margin: 0;

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.subOption};
  }
`;

export const SpeedOption = styled.button`
  background: rgba(252, 161, 199, 0.1);
  border: 1px solid rgba(252, 161, 199, 0.3);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${theme.colors.white};
  font-size: ${theme.typography.sizes.subOption};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(252, 161, 199, 0.2);
    border-color: ${theme.colors.main};
    color: ${theme.colors.main};
  }

  &:active {
    background: rgba(252, 161, 199, 0.3);
  }

  ${theme.media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.sizes.button};
  }
`;

export const StopButton = styled.button`
  background: rgba(255, 59, 48, 0.2);
  border: 1px solid rgba(255, 59, 48, 0.5);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: #ff3b30;
  font-size: ${theme.typography.sizes.subOption};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${theme.typography.weights.medium};

  &:hover {
    background: rgba(255, 59, 48, 0.3);
    border-color: #ff3b30;
    color: #ff3b30;
  }

  &:active {
    background: rgba(255, 59, 48, 0.4);
  }

  ${theme.media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.sizes.button};
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.grayText};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.grayText};
  font-size: ${theme.typography.sizes.button};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  margin-top: ${theme.spacing.md};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.white};
    color: ${theme.colors.white};
  }

  ${theme.media.mobile} {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 14px;
  }
`;
