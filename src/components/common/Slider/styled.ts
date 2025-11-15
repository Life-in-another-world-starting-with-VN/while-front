import styled from 'styled-components';

export const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const SliderLabel = styled.label`
  font-size: 1.05rem;
  color: rgba(16, 34, 61, 0.8);
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.9rem;
  background: rgba(98, 123, 255, 0.16);
  border-radius: 999px;
  overflow: hidden;
`;

export const SliderFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #627bff 0%, #8e9dff 100%);
  border-radius: inherit;
  pointer-events: none;
  transition: width 0.2s ease;
`;

export const SliderThumb = styled.div`
  position: absolute;
  top: 50%;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #ffffff;
  border: 3px solid #627bff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.2s ease, box-shadow 0.2s ease;
  pointer-events: none;
  box-shadow: 0 10px 18px rgba(98, 123, 255, 0.35);
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

  &:focus-visible ~ ${SliderThumb} {
    box-shadow: 0 0 0 6px rgba(98, 123, 255, 0.28);
  }
`;
