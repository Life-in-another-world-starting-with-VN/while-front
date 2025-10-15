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
    /* 드래그 및 텍스트 선택 방지 */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    /* 드래그 방지 */
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
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

  /* 선택 텍스트 비활성화 */
  ::selection {
    background-color: transparent;
    color: inherit;
  }

  ::-moz-selection {
    background-color: transparent;
    color: inherit;
  }

  /* 이미지 드래그 방지 */
  img {
    pointer-events: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;