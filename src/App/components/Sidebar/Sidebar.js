// External Modules
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

// Global Functions
import { derive } from 'global/functions';

// Local Styles
import {
  SidebarContainer,
  List,
  ListItem,
  ListItemTitle,
  AddButton,
  Input
} from './Sidebar.styles';

const Sidebar = ({
  dates = ['AY 2016-2017', 'AY 2017-2018'],
  selectedDate = 0,
  setSelectedDate = i => console.log(`Item ${i + 1} was selected`),
  pushEntry = entry => console.log(`New entry ${entry} added`)
}) => {
  const [value, setValue] = useState('');

  return (
    <SidebarContainer>
      <Input
        placeholder='Enter Year (Ex: AY 2018-2019)'
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <AddButton
        onClick={() => {
          pushEntry(value);
          setValue('');
        }}>
        Add new entry
      </AddButton>
      <List>
        {dates.map((date, i) => (
          <ListItem
            key={`Sidebar Option (${i}) ${date.name}`}
            onClick={() => setSelectedDate(i)}
            selected={selectedDate === i}>
            <ListItemTitle>{date.name}</ListItemTitle>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

const mapStoresToProps = derive({
  dates: 'appStore.data',
  selectedDate: 'appStore.selected',
  setSelectedDate: 'appStore',
  pushEntry: 'appStore'
});

export { Sidebar };
export default inject(mapStoresToProps)(observer(Sidebar));
