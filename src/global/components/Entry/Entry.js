// External Modules
import React from 'react';

// Local Styles
import {
  EntryContainer,
  EntryInfo,
  EntryInfoHeader,
  Divider
} from './Entry.styles';

const Entry = ({
  passedProps,
  data = [
    'Course name',
    'Client Server Programming',
    'Course code',
    '16CSCN1CCS'
  ]
}) => {
  return (
    <EntryContainer {...passedProps}>
      <EntryInfo>
        {data[0]} <Divider>:</Divider>{' '}
        <EntryInfoHeader>{data[1]}</EntryInfoHeader>
      </EntryInfo>
      <EntryInfo>
        {data[2]} <Divider>:</Divider>{' '}
        <EntryInfoHeader>{data[3]}</EntryInfoHeader>
      </EntryInfo>
    </EntryContainer>
  );
};

export default Entry;
