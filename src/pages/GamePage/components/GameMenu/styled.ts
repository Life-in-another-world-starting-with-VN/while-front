import styled from 'styled-components';
import { theme } from '../../../../styles';

export const MenuContainer = styled.div`
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: ${theme.spacing.md};
  z-index: 10;
  pointer-events: auto;
  white-space: nowrap;

  ${theme.media.tablet} {
    gap: 30px;
    bottom: 5%;
  }

  ${theme.media.mobile} {
    gap: 20px;
    bottom: 3%;
    padding: ${theme.spacing.sm};
  }
`;

export const MenuItem = styled.button`
  font-size: ${theme.typography.sizes.button};
  color: ${theme.colors.grayText};
  font-weight: ${theme.typography.weights.regular};
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: ${theme.spacing.sm};
  transition: color 0.2s ease;
  pointer-events: auto;

  &:hover {
    color: ${theme.colors.white};
  }

  &:active {
    color: ${theme.colors.main};
  }

  ${theme.media.tablet} {
    font-size: ${theme.typography.sizes.body};
    padding: ${theme.spacing.xs};
  }

  ${theme.media.mobile} {
    font-size: 12px;
    padding: 2px;
  }
`;
