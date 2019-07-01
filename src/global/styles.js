import styled, { createGlobalStyle, css } from 'styled-components';

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
  gray_bg: '#EBEBEB',
  gray_light: '#F3F3F3',

  _text: '#707070',
  primary: '#6C63FF',
  primary_dark: '#5951d6',
  primary_tint: '#EAE3F0',
  error: '#e74c3c'
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
    background-color: ${colors.primary_dark};
  }

  :active {
    background-color: ${colors.primary};
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
    border-color: ${colors.primary_dark};
  }
`;

export const contextMenuStyles = css`
  .react-contextmenu {
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    color: #373a3c;
    font-size: 16px;
    margin: 2px 0 0;
    min-width: 160px;
    outline: none;
    opacity: 0;
    padding: 5px 0;
    pointer-events: none;
    text-align: left;
    transition: opacity 250ms ease !important;
  }

  .react-contextmenu.react-contextmenu--visible {
    opacity: 1;
    pointer-events: auto;
    z-index: 9999;
  }

  .react-contextmenu-item {
    background: 0 0;
    border: 0;
    color: #373a3c;
    cursor: pointer;
    font-weight: 400;
    line-height: 1.5;
    padding: 3px 20px;
    text-align: inherit;
    white-space: nowrap;
  }

  .react-contextmenu-item.react-contextmenu-item--active,
  .react-contextmenu-item.react-contextmenu-item--selected {
    color: #fff;
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    text-decoration: none;
  }

  .react-contextmenu-item.react-contextmenu-item--disabled,
  .react-contextmenu-item.react-contextmenu-item--disabled:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
    color: #878a8c;
  }

  .react-contextmenu-item--divider {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    cursor: inherit;
    margin-bottom: 3px;
    padding: 2px 0;
  }
  .react-contextmenu-item--divider:hover {
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.15);
  }

  .react-contextmenu-item.react-contextmenu-submenu {
    padding: 0;
  }

  .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
  }

  .react-contextmenu-item.react-contextmenu-submenu
    > .react-contextmenu-item:after {
    content: '▶';
    display: inline-block;
    position: absolute;
    right: 7px;
  }

  .example-multiple-targets::after {
    content: attr(data-count);
    display: block;
  }
`;
