import styled from 'styled-components';
import { theme } from '../../../styles';

export const RightSection = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

export const SettingsGrid = styled.div`
  display: flex;
  gap: 9.375rem;
  margin-top: 3.75rem;

  @media (max-width: 1200px) {
    gap: 5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }
`;

export const SliderSection = styled.div`
  display: flex;
  gap: 12.5rem;
  margin-top: 3rem;

  @media (max-width: 1200px) {
    gap: 6rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

export const SliderColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
  width: 21.875rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 2rem;
  }
`;

export const MuteButton = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 6rem;
  font-size: 2.5rem;
  color: ${theme.colors.unselected};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
    bottom: 2rem;
    right: 3rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;