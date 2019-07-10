// External Modules
import styled from 'styled-components';

// Global Styles
import { colors, zIndices } from 'global/styles';

export const AppbarContainer = styled.div`
  width: 100vw;
  height: 5rem;
  background-color: white;
  position: absolute;
  top: 0; left: 0;
  display: flex;
  z-index: ${zIndices.level4};
  border-bottom: 1px solid ${colors.gray_bg};
  align-items: center;

  .Icon {
    color: ${colors.primary};
    margin-left: 20px;
    cursor: pointer;

    :hover {
      color: ${colors.primary_dark};
    }
  }
`;

export const TitleContainer = styled.div`
  width: 24rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${colors.gray_bg};
`;

export const Title = styled.h1`
  color: ${colors.primary};
  text-transform: uppercase;
  font-size: 2.2rem;
`;