import styled, {createGlobalStyle} from 'styled-components';

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
  primary_dark: "#5951d6",
  primary_tint: "#EAE3F0"
};

export const zIndices = {
  level1: 1, // App
  level2: 2, // Backdrop
  level3: 3, // Sidebar
  level4: 4, // Appbar
  level5: 5
};

export const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;

  :hover {
    background-color: ${colors.primary_dark}
  }

  :active {
    background-color: ${colors.primary}
  }
`;

export const Input = styled.input`
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  outline: none;
  margin: 6px 6px 0px;
  padding: 0px 6px;

  :focus {
    border-color: ${colors.primary_dark}
  }
`;