// External Modules
import styled from 'styled-components';

// Global Styles
import { colors } from 'global/styles';

export const AppbarContainer = styled.div`
  width: 100vw;
  height: 5rem;
  background-color: white;
  position: absolute;
  top: 0; left: 0;
  display: flex;
`;

export const TitleContainer = styled.div`
  width: 24rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${colors.gray_bg}
`;

export const Title = styled.h1`
  color: ${colors.primary};
  text-transform: uppercase;
  font-size: 2.2rem;
`;