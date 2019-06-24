// External Modules
import styled from 'styled-components';

// Global Styles
import { colors } from 'global/styles';

export const OutputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1.2rem;
`;

export const OutputPO = styled.p`
  flex: 1;
  font-size: 1.6rem;
  color: gray;
  padding: 0 8px;
`;

export const OutputCO = styled.p`
  flex: 1;
  font-size: 1.6rem;
  color: gray;
  padding: 0 8px;
  padding-right: 16px;
`;

export const OutputBar = styled.div`
  width: 62.4rem;
  height: 4rem;
  background-color: ${colors.primary_tint};  
`;

export const OutputBarPercentage = styled.div`
  width: ${({percentage}) => percentage ? `${percentage}%` : "0%"};
  height: 100%;
  background-color: ${colors.primary_dark};
`;

export const OutputPercentage = styled.p`
  flex: 1;
  font-size: 2rem;
  color: ${colors.primary};
  padding-left: 3.6rem;
`;


