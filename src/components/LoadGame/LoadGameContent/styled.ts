import styled from 'styled-components';
import { theme } from '../../../styles';

export const RightSection = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const SaveSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3.125rem 3rem;
  margin-top: 4rem;
  width: 100%;
  max-width: 80rem;

  @media (max-width: 1400px) {
    gap: 2rem 2rem;
    max-width: 70rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }
`;

export const QuickSaveInfo = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: ${theme.colors.grayText};
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    bottom: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    bottom: 3rem;
  }
`;