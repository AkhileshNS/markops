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