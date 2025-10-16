import styled from 'styled-components';
import { theme } from '../../../../styles';

export const SpriteContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 95%;
  max-height: 1100px;
  z-index: 1;
  pointer-events: none;

  ${theme.media.tablet} {
    height: 85%;
    max-height: 900px;
  }

  ${theme.media.mobile} {
    height: 75%;
    max-height: 700px;
  }
`;

export const SpriteImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.5));
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${theme.media.tablet} {
    max-width: 90vw;
  }

  ${theme.media.mobile} {
    max-width: 80vw;
  }
`;
