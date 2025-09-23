import styled from 'styled-components';

const OptionButton = styled.button<{ color?: string }>`
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  background-color: ${({ color }) => color || '#e6f0ff'};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;

export default OptionButton;
