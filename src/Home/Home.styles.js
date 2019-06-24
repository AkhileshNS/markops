// External Modules
import styled from 'styled-components';

// Global Styles
import { colors, Button } from 'global/styles';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 2.4rem;
`;

export const TitleContainer = styled.div`
  width: 100%;
  min-height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${colors.primary};
  user-select: none;
`;

export const AddButton = styled(Button)`
  width: 16rem;
  height: 3.2rem;
  font-size: 1.4rem;
`;

export const List = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
