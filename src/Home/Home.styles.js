// External Modules
import styled from 'styled-components';

// Global Styles
import { colors, Button, contextMenuStyles } from 'global/styles';

export const HomeContainer = styled.div`
  width: 100%;
  padding: 0px 2.4rem;

  ${contextMenuStyles}
`;

export const DashBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  color: ${colors.primary};
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 1.6rem;
`;

export const DashBoardTitle = styled.p`
  font-size: 1.6rem;
  padding-bottom: 8px;
`;

export const Scores = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const Score = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${colors.primary_tint};
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  margin: 2px;
`;

export const ScoreTitle = styled.span`
  font-size: 1.4rem;
  padding-left: 6px;
`;

export const ScoreValue = styled.span`
  font-size: 2rem;
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
