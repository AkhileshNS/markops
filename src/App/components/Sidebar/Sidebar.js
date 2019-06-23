// External Modules
import React from 'react';
import { inject, observer } from 'mobx-react';

// Local Styles
import {
  SidebarContainer,
  List,
  ListItem,
  ListItemTitle
} from './Sidebar.styles';

const Sidebar = ({
  dates = ['AY 2016-2017', 'AY 2017-2018'],
  selectedDate = 0,
  setSelectedDate = i => console.log(`Item ${i+1} was selected`)
}) => {
  return (
    <SidebarContainer>
      <List>
        {dates.map((date, i) => (
          <ListItem key={`Sidebar Option (${i}) ${date}`} onClick={() => setSelectedDate(i)} selected={selectedDate === i}>
            <ListItemTitle>{date}</ListItemTitle>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

const mapStoresToProps = stores => ({
  dates: stores.appStore.options.dates,
  selectedDate: stores.appStore.selected.date,
  setSelectedDate: stores.appStore.setSelectedDate
});

export { Sidebar };
export default inject(mapStoresToProps)(observer(Sidebar));
