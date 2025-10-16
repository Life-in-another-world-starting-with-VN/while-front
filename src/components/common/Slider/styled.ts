import styled from 'styled-components';
import { theme } from '../../../styles';

export const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SliderLabel = styled.label`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 1.5625rem;
  background-color: ${theme.colors.sub1};
  border-radius: 1.25rem;
  overflow: hidden;
`;

export const SliderThumb = styled.div<{ position?: number }>`
  position: absolute;
  width: 0.625rem;
  height: 1.5833rem;
  background-color: ${theme.colors.sub3};
  border-radius: 1.25rem;
  left: ${props => props.position ? `${props.position}%` : '70%'};
  top: 0;
  transition: left 0.2s ease;
`;