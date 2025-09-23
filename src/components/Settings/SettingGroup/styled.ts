import styled from 'styled-components';
import { theme } from '../../../styles';

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const SettingTitle = styled.h3`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Option = styled.div<{ isActive?: boolean }>`
  font-size: 2.1875rem;
  color: ${props => props.isActive ? theme.colors.text : theme.colors.unselected};
  font-weight: ${theme.typography.weights.regular};
  line-height: ${theme.typography.lineHeight.normal};
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  &:hover {
    color: ${theme.colors.text};
  }
`;