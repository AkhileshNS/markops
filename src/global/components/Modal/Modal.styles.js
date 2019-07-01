// External Modules
import styled, {css} from 'styled-components';

// Global Styles
import { colors, zIndices, Button, Input } from 'global/styles';

export const ModalContainer = styled.div`
  width: 70rem;
  padding: 6px;
  border-radius: 4px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  overflow: hidden;
  z-index: ${zIndices.level3};
`;

export const DialogContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .files-dropzone {
    font-size: 1.6rem;
    border: 1px solid gray;
    border-radius: 4px;
    margin: 6px;
    padding: 12px;
    text-align: center;
    cursor: pointer;

    :hover {
      background-color: ${colors.gray_light}
    }
  }
`;

export const DialogMessage = styled.p`
  font-size: 1.6rem;
  color: ${({gray, red}) => gray ? "gray" : (red ? colors.error : colors.primary)};
  margin: 6px;
  
  ${({red}) => red ? css`
    margin: 0 0 0 6px;
  ` : ""}
`;

export const DialogOptions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DialogButton = styled(Button)`
  font-size: 1.6rem;
  padding: 6px;
  margin: 6px;

  :disabled,[disabled] {
    background-color: ${colors.primary};
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const DialogInput = styled(Input)`
  width: calc(100% - 12px);
  margin: 6px;
  padding: 8px 6px;
`;

export const FormMessage = styled(DialogMessage)`
  font-size: 1.8rem;
  text-align: center;
`;
