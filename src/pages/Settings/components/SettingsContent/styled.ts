import styled from 'styled-components';
import { theme } from '../../../../styles';

export const RightSection = styled.div`
  width: 100%;
  padding: clamp(2.25rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 2.75rem);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 36px;
  box-shadow: 0 32px 64px rgba(18, 38, 76, 0.2);
  backdrop-filter: blur(22px);

  @media (max-width: 980px) {
    border-radius: 28px;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    gap: 1.75rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HeaderTitle = styled.h2`
  font-size: clamp(2rem, 3.2vw, 2.6rem);
  color: rgba(16, 34, 61, 0.92);
  margin: 0;
  font-weight: ${theme.typography.weights.medium};
  line-height: 1.1;
`;

export const HeaderSubtitle = styled.p`
  font-size: clamp(0.95rem, 1.6vw, 1.05rem);
  color: rgba(16, 34, 61, 0.65);
  margin: 0;
  line-height: 1.6;
`;

export const SettingsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const SectionCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(16, 34, 61, 0.08);
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.55);
  padding: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SliderSection = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const SliderColumn = styled(SectionCard)`
  gap: 1.75rem;
  padding: clamp(1.75rem, 3vw, 2.2rem);
`;

export const MuteButton = styled.button`
  align-self: flex-end;
  font-size: 1.05rem;
  color: rgba(16, 34, 61, 0.68);
  background: linear-gradient(90deg, rgba(98, 123, 255, 0.2) 0%, rgba(140, 168, 255, 0.2) 100%);
  border: 1px solid rgba(98, 123, 255, 0.32);
  border-radius: 999px;
  padding: 0.85rem 1.8rem;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  line-height: 1.2;
  box-shadow: 0 18px 36px rgba(98, 123, 255, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease, color 0.18s ease,
    background 0.18s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  &:hover {
    color: #0c1c3f;
    transform: translateY(-1px);
    background: linear-gradient(90deg, rgba(98, 123, 255, 0.26) 0%, rgba(140, 168, 255, 0.26) 100%);
    box-shadow: 0 22px 40px rgba(98, 123, 255, 0.24);
  }
`;
