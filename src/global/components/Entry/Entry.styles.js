// External Modules
import styled from 'styled-components';

// Global Styles 
import { colors } from 'global/styles'; 

export const EntryContainer = styled.div`
  width: 100%;
  height: 6rem;
  background-color: white;
  color: ${colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 1.6rem;
  padding: 0 3.2rem;
`;

export const EntryInfo = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Divider = styled.span`
  padding: 0 6px;
`;

export const EntryInfoHeader = styled.span`
  font-size: 2.4rem;
  font-weight: normal;
`;
