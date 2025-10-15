import styled from 'styled-components';
import { theme } from '../../../../styles';

export const ChoiceContainer = styled.div`
  position: absolute;
  bottom: 35%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  width: 80%;
  max-width: 800px;
  padding: ${theme.spacing.lg};
  z-index: 5;

  ${theme.media.tablet} {
    bottom: 30%;
    width: 85%;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
  }

  ${theme.media.mobile} {
    bottom: 35%;
    width: 90%;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.sm};
  }
`;

export const ChoiceButton = styled.button`
  background: ${theme.colors.sub1};
  border: 2px solid ${theme.colors.main};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.sizes.subOption};
  font-weight: ${theme.typography.weights.regular};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  line-height: 1.4;
  pointer-events: auto;
  z-index: 5;

  &:hover {
    background: ${theme.colors.main};
    color: ${theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.card};
  }

  &:active {
    transform: translateY(0);
  }

  ${theme.media.tablet} {
    font-size: ${theme.typography.sizes.button};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.body};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-width: 1px;
  }
`;
