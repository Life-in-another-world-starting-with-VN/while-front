import styled from 'styled-components';
import { theme } from '../../../../styles';

export const SaveSlotContainer = styled.div`
  width: 24.3125rem;
  height: 18.25rem;
  background: ${theme.colors.gradient.primary};
  border-radius: 6.875rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    width: 20rem;
    height: 15rem;
    border-radius: 5rem;
  }

  @media (max-width: 480px) {
    width: 18rem;
    height: 13rem;
    border-radius: 4rem;
  }

  &:hover {
    background: ${theme.colors.gradient.hover};
    transform: scale(1.02);
  }
`;

export const SaveSlotContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${theme.colors.text};
  font-family: ${theme.typography.fontFamily};
`;

export const SaveSlotTitle = styled.div`
  font-size: 1.5rem;
  font-weight: ${theme.typography.weights.regular};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const SaveSlotInfo = styled.div`
  font-size: 1rem;
  color: ${theme.colors.unselected};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;