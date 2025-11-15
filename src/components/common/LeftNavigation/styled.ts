import styled from 'styled-components';
import { theme } from '../../../styles';

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: clamp(2rem, 4vw, 2.75rem);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 52px rgba(18, 38, 76, 0.14);
  backdrop-filter: blur(20px);
  gap: clamp(1.75rem, 3vw, 2.25rem);
  min-height: 100%;

  @media (max-width: 768px) {
    border-radius: 24px;
    padding: 1.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.2rem, 3.2vw, 2.8rem);
  color: rgba(16, 34, 61, 0.9);
  margin: 0;
  font-weight: ${theme.typography.weights.medium};
  line-height: 1.1;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const MenuItem = styled.li<{ $isActive?: boolean }>`
  font-size: clamp(1.1rem, 1.8vw, 1.3rem);
  color: ${({ $isActive }) =>
    $isActive ? '#0c1c3f' : 'rgba(16, 34, 61, 0.58)'};
  cursor: pointer;
  font-weight: 600;
  line-height: 1.4;
  padding: 0.85rem 1.1rem;
  border-radius: 18px;
  background: ${({ $isActive }) =>
    $isActive ? 'rgba(98, 123, 255, 0.14)' : 'transparent'};
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? 'rgba(98, 123, 255, 0.35)' : 'rgba(16, 34, 61, 0.08)'};
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, box-shadow 0.18s ease;
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 14px 24px rgba(98, 123, 255, 0.22)' : 'none'};

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  &:hover {
    color: #0c1c3f;
    background: rgba(255, 255, 255, 0.72);
    border-color: rgba(16, 34, 61, 0.14);
    transform: translateX(4px);
    box-shadow: 0 12px 24px rgba(16, 34, 61, 0.15);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(16, 34, 61, 0) 0%,
    rgba(16, 34, 61, 0.18) 18%,
    rgba(16, 34, 61, 0.18) 82%,
    rgba(16, 34, 61, 0) 100%
  );
`;

export const BackButton = styled.button`
  margin-top: auto;
  align-self: flex-start;
  font-size: 1.05rem;
  color: rgba(16, 34, 61, 0.65);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(16, 34, 61, 0.12);
  border-radius: 999px;
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  line-height: 1.2;
  box-shadow: 0 14px 28px rgba(16, 34, 61, 0.12);
  transition: transform 0.18s ease, box-shadow 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, background 0.18s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  &:hover {
    color: #0c1c3f;
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(16, 34, 61, 0.18);
    box-shadow: 0 18px 32px rgba(16, 34, 61, 0.18);
  }
`;
