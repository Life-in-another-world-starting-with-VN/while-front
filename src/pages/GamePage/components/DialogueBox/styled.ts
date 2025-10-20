import styled from 'styled-components';
import { theme } from '../../../../styles';

export const DialogueBoxContainer = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  cursor: pointer;
  padding: ${theme.spacing.xl};
  pointer-events: none;
  z-index: 2;

  ${theme.media.tablet} {
    bottom: 18%;
    padding: ${theme.spacing.lg};
    gap: ${theme.spacing.md};
  }

  ${theme.media.mobile} {
    bottom: 20%;
    padding: ${theme.spacing.md};
  }
`;

export const CharacterName = styled.div<{ color?: string }>`
  color: ${props => props.color || theme.colors.main};
  font-size: ${theme.typography.sizes.option};
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: normal;
  -webkit-text-stroke: 2px black;
  paint-order: stroke fill;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;

  ${theme.media.tablet} {
    font-size: ${theme.typography.sizes.subOption};
    -webkit-text-stroke: 1.5px black;
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.button};
    -webkit-text-stroke: 1px black;
  }
`;

export const DialogueText = styled.div`
  color: ${theme.colors.white};
  font-size: ${theme.typography.sizes.option};
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: 1.4;
  word-wrap: break-word;
  -webkit-text-stroke: 2px black;
  paint-order: stroke fill;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;

  ${theme.media.tablet} {
    font-size: ${theme.typography.sizes.subOption};
    -webkit-text-stroke: 1.5px black;
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.sizes.button};
    line-height: 1.5;
    -webkit-text-stroke: 1px black;
  }
`;
