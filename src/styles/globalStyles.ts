import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'OneStoreMobilePop';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff');
    font-weight: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  input {
    border: none;
    outline: none;
    font-family: inherit;
  }

  /* 커스텀 스크롤바 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.sub3};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.sub2};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.main};
  }

  /* 선택 텍스트 색상 */
  ::selection {
    background-color: ${theme.colors.main};
    color: ${theme.colors.white};
  }
`;