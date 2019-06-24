// External Modules
import styled from 'styled-components';

// Global Styles
import { zIndices } from 'global/styles';

export const BackdropContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: ${zIndices.level2}
`;
