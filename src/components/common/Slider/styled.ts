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

export const SliderFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${theme.colors.main};
  border-radius: inherit;
  pointer-events: none;
`;

export const SliderThumb = styled.div`
  position: absolute;
  top: 50%;
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${theme.colors.sub3};
  border: 2px solid ${theme.colors.sub3};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.2s ease;
  pointer-events: none;
`;

export const SliderInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
`;
