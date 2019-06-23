import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  button {
    outline: none;
    border: none;
  }
`;

export const colors = {
  gray_bg: "#EBEBEB",
  gray_light: "#F3F3F3",
  
  _text: "#707070",
  primary: "#6C63FF",
  primary_dark: "#5951d6"
};

export const zIndices = {
  level1: 1, // App
  level2: 2, // Backdrop
  level3: 3, // Sidebar
  level4: 4, // Appbar
  level5: 5
}