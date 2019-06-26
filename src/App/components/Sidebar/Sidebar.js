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
  dates = [{
    name: '2016 Batch'
  }, {
    name: '2017 Batch'
  }],
  selectedDate = 0,
  setSelectedDate = i => console.log(`Item ${i + 1} was selected`),
  pushBatch = batch => console.log(`New batch ${batch} added`),
  setRoute
}) => {
  const [value, setValue] = useState('');

  return (
    <SidebarContainer>
      <Input
        placeholder='Enter Batch (Ex: 2016 Batch)'
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <AddButton
        onClick={() => {
          pushBatch(value);
          setValue('');
        }}>
        Add new batch
      </AddButton>
      <List>
        {dates.map(({batch}, i) => (
          <ListItem
            key={`Sidebar Option (${i}) ${batch}`}
            onClick={() => {
              setSelectedDate(i);
              setRoute('/all')
            }}
            selected={selectedDate === i}>
            <ListItemTitle>{batch}</ListItemTitle>
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
  pushBatch: 'appStore',
  setRoute: "appStore"
});

export { Sidebar };
export default inject(mapStoresToProps)(observer(Sidebar));
