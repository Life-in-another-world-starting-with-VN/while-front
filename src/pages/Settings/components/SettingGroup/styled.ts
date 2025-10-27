import styled from 'styled-components';
import { theme } from '../../../../styles';

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.25rem;
`;

export const SettingTitle = styled.h3`
  font-size: clamp(1.35rem, 2vw, 1.6rem);
  color: rgba(16, 34, 61, 0.92);
  font-weight: ${theme.typography.weights.medium};
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Option = styled.div<{ isActive?: boolean }>`
  font-size: 1rem;
  color: ${({ isActive }) =>
    isActive ? '#ffffff' : 'rgba(16, 34, 61, 0.6)'};
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(90deg, #627bff 0%, #8e9dff 100%)'
      : 'rgba(255, 255, 255, 0.85)'};
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'rgba(98, 123, 255, 0.4)' : 'rgba(16, 34, 61, 0.1)'};
  box-shadow: ${({ isActive }) =>
    isActive ? '0 16px 28px rgba(98, 123, 255, 0.25)' : '0 10px 20px rgba(16, 34, 61, 0.08)'};
  transition: transform 0.18s ease, color 0.18s ease, background 0.18s ease,
    box-shadow 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    color: #0c1c3f;
    background: ${({ isActive }) =>
      isActive ? 'linear-gradient(90deg, #5a72ff 0%, #8894ff 100%)' : 'rgba(255, 255, 255, 0.95)'};
    border-color: rgba(98, 123, 255, 0.4);
    box-shadow: 0 16px 28px rgba(98, 123, 255, 0.24);
  }
`;
