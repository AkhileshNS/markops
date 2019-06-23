// External Modules
import styled from 'styled-components';

// Global Styles
import { colors, zIndices } from 'global/styles';

export const AppContainer = styled.div`
  width: calc(100vw - 24rem);
  height: calc(100vh - 5rem);
  background-color: ${colors.gray_bg};
  margin-top: 5rem;
  margin-left: 24rem;
  z-index: ${zIndices.level1};
  position: relative;
`;