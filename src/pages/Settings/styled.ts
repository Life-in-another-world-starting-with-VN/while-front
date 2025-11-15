import styled from 'styled-components';
import { theme } from '../../styles';

export const SettingsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: radial-gradient(120% 120% at 0% 0%, #fef5ff 0%, #ecf4ff 42%, #f6fbff 78%);
  font-family: ${theme.typography.fontFamily};
  display: grid;
  grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
  overflow: visible;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: clamp(1.25rem, 5vw, 2rem);
  }
`;
