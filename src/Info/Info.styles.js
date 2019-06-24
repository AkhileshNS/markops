// External Modules
import styled from 'styled-components';

// Global Styles
import { colors } from "global/styles";

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 2.4rem;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 6.4rem;
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${colors.primary};
  user-select: none;
`;
