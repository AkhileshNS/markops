// External Modules
import styled from 'styled-components';

// Global Styles
import { zIndices, colors } from 'global/styles';

export const SidebarContainer = styled.div`
  width: 24rem;
  height: 100vh;
  background-color: white;
  padding-top: 5rem;
  z-index: ${zIndices.level3};
  position: absolute;
  top: 0; left: 0;
  display: flex;
  flex-direction: column;
`;

export const List = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  border-top: 1px solid ${colors.gray_bg};
`;

export const Input = styled.input.attrs(props => ({
  type: "text"
}))`
  width: calc(100% - 12px);
  height: calc(4.8rem - 12px);
  background-color: white;
  border: 1px solid gray;
  outline: none;
  margin: 6px 6px 0px;
  padding: 0px 6px;

  :focus {
    border-color: ${colors.primary_dark}
  }
`;

export const AddButton = styled.button`
  width: calc(100% - 12px);
  height: calc(4.8rem - 12px);
  background-color: ${colors.primary};
  color: white;
  outline: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  margin: 6px;

  :hover {
    background-color: ${colors.primary_dark}
  }

  :active {
    background-color: ${colors.primary}
  }
`;

export const ListItem = styled.li`
  width: 100%;
  height: 4.8rem;
  background-color: ${({selected}) => selected ? colors.gray_light : "white"};
  color: ${({selected}) => selected ? colors.primary : colors._text};
  border-bottom: 1px solid ${colors.gray_bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease;

  :hover {
    color: ${({selected}) => selected ? colors.primary : "black"};
  }
`;

export const ListItemTitle = styled.p`
  font-size: 1.6rem;
`;