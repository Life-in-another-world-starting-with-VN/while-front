import styled from 'styled-components';
import { theme } from '../../styles';

export const LoadGameContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colors.background};
  font-family: ${theme.typography.fontFamily};
  position: relative;
  display: flex;
  overflow: hidden;
`;